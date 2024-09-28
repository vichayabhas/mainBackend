import { getUser } from "../middleware/auth";
import Baan from "../models/Baan";
import Camp from "../models/Camp";
import HelthIsue from "../models/HelthIsue";
import NongCamp from "../models/NongCamp";
import Part from "../models/Part";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
import ShertManage from "../models/ShertManage";
import User, { buf } from "../models/User";
import { calculate, resOk, sendingEmail, sendRes, swop } from "./setup";
import express, { json } from "express";
import bcrypt from "bcrypt"
import { HelthIsueBody, InterUser, Register, ShowMember, UpdateTimeOffset } from "../models/intreface";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Song from "../models/Song";
import TimeOffset from "../models/TimeOffset";
//*export async function register
//*export async function login
//*export async function getMe
// export async function logout
//*export async function updateMode
//*export async function updateSize
//*export async function getHelthIsue
//*export async function updateHelth
//*export async function updateBottle
//*export async function getShertManageByCampId
//*export async function updateProfile
//*export async function changeModeToPee
//*export async function checkTel
//*export async function updateSleep
//*export async function getUsers
//*export async function getShertmanage
//*export async function updateTimeOffset
//*export async function getTimeOffset
//*export async function signId
//*export async function verifyEmail
//*export async function revalidaionHelthIshues
//*export async function checkPassword
export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const buf: Register = req.body
		const user = await User.create(buf);
		const select = await TimeOffset.create({ userId: user._id })
		const display = await TimeOffset.create({ userId: user._id })
		await user.updateOne({ displayOffsetId: display._id, selectOffsetId: select._id })
		sendTokenResponse(user as InterUser, 200, res);
	} catch (err) {
		res.status(400).json({
			success: false
		});
		console.log(err);
	}
}
export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
	const {
		email,
		password
	} = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			msg: "Please provide an email and password"
		});
	}
	const user = await User.findOne({
		email
	}).select("+password");
	if (!user) {
		return res.status(400).json({
			success: false,
			msg: "Invalid credentials"
		});
	}
	const isMatch = await bcrypt.compare(password, user.password);
	
	if (!isMatch) {
		return res.status(401).json({
			success: false,
			msg: "Invalid credentials"
		});
	}
	sendTokenResponse(user as InterUser, 200, res);
}
const sendTokenResponse = (user: InterUser, statusCode: number, res: express.Response) => {
	const token = jwt.sign({ id: user._id }, buf, {
		expiresIn: process.env.JWT_EXPIRE
	});
	const options = {
		expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE || '0') * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});
};
export async function getMe(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	res.status(200).json(user);
}
export async function logout(req: express.Request, res: express.Response, next: express.NextFunction) {
	//Clears cookie
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});
	res.status(200).json({
		success: true,
		data: {}
	});
}
export async function updateMode(req: express.Request, res: express.Response, next: express.NextFunction) {
	const {
		mode,
		filter,
		linkHash
	} = req.body;
	const user = await User.findByIdAndUpdate((await getUser(req))?._id, {
		mode,
		filter, linkHash
	});
	res.status(200).json(user);
}
export async function updateSize(req: express.Request, res: express.Response, next: express.NextFunction) {
	const shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' = req.params.id as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
	const old = await getUser(req)
	if (!old) {
		sendRes(res, false)
		return
	}
	const oldSize = old.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
	if (shertSize) {
		const user = await User.findByIdAndUpdate(old._id, {
			shertSize
		});
		if (!user) {
			sendRes(res, false)
			return
		}
		var i = 0
		while (i < user.shertManageIds.length) {
			const shertManage = await ShertManage.findById(user.shertManageIds[i++])
			if (!shertManage) {
				continue
			}
			switch (shertManage.role) {
				case 'nong': {
					const nongCamp = await NongCamp.findById(shertManage.campModelId)
					if (!nongCamp) {
						continue
					}
					const camp = await Camp.findById(nongCamp.campId)
					if (!camp || camp.dataLock) {
						continue
					}
					const baan = await Baan.findById(nongCamp.baanId);
					if (!baan) {
						continue
					}
					await shertManage.updateOne({ size: shertSize })
					camp.nongShertSize.set(oldSize, calculate(camp.nongShertSize.get(oldSize), 0, 1));
					camp.nongShertSize.set(shertSize, calculate(camp.nongShertSize.get(shertSize), 1, 0));
					baan.nongShertSize.set(oldSize, calculate(baan.nongShertSize.get(oldSize), 0, 1));
					baan.nongShertSize.set(shertSize, calculate(baan.nongShertSize.get(shertSize), 1, 0));
					await camp.updateOne({
						nongShertSize: camp.nongShertSize,
					})
					await baan.updateOne({
						nongShertSize: baan.nongShertSize,
					})
					break
				}
				case 'pee': {
					const peeCamp = await PeeCamp.findById(shertManage.campModelId)
					if (!peeCamp) {
						continue
					}
					const camp = await Camp.findById(peeCamp.campId)
					if (!camp || camp.peeDataLock) {
						continue
					}
					const baan = await Baan.findById(peeCamp.baanId);
					const part = await Part.findById(peeCamp.partId)
					if (!baan || !part) {
						continue
					}
					await shertManage.updateOne({ size: shertSize })
					camp.peeShertSize.set(oldSize, calculate(camp.peeShertSize.get(oldSize), 0, 1));
					camp.peeShertSize.set(shertSize, calculate(camp.peeShertSize.get(shertSize), 1, 0));
					baan.peeShertSize.set(oldSize, calculate(baan.peeShertSize.get(oldSize), 0, 1));
					baan.peeShertSize.set(shertSize, calculate(baan.peeShertSize.get(shertSize), 1, 0));
					part.peeShertSize.set(oldSize, calculate(part.peeShertSize.get(oldSize), 0, 1));
					part.peeShertSize.set(shertSize, calculate(part.peeShertSize.get(shertSize), 1, 0));
					await camp.updateOne({
						peeShertSize: camp.peeShertSize,
					})
					await baan.updateOne({
						peeShertSize: baan.peeShertSize,
					})
					await part.updateOne({
						peeShertSize: part.peeShertSize,
					})
					break
				}
				case 'peto': {
					const petoCamp = await PetoCamp.findById(shertManage.campModelId)
					if (!petoCamp) {
						continue
					}
					const camp = await Camp.findById(petoCamp.campId)
					if (!camp || camp.petoDataLock) {
						continue
					}
					const part = await Part.findById(petoCamp.partId)
					if (!part) {
						continue
					}
					await shertManage.updateOne({ size: shertSize })
					camp.petoShertSize.set(oldSize, calculate(camp.petoShertSize.get(oldSize), 0, 1));
					camp.petoShertSize.set(shertSize, calculate(camp.petoShertSize.get(shertSize), 1, 0));
					part.petoShertSize.set(oldSize, calculate(part.petoShertSize.get(oldSize), 0, 1));
					part.petoShertSize.set(shertSize, calculate(part.petoShertSize.get(shertSize), 1, 0));
					await camp.updateOne({
						petoShertSize: camp.petoShertSize,
					})
					await part.updateOne({
						petoShertSize: part.petoShertSize,
					})
					break
				}
			}
		}
		res.status(200).json(user);
	} else {
		res.status(400).json({
			success: false
		})
	}
}
export async function getHelthIsue(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const data = await HelthIsue.findById(req.params.id);
		if (!data) {
			return res.status(400).json({
				success: false
			});
		}
		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({
			success: false
		});
	}
}
export async function updateHelth(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	const helthIsueBody: HelthIsueBody = req.body
	if (!user) {
		sendRes(res, false)
		return
	}
	const oldHelthId = user.helthIsueId
	const old = await HelthIsue.findById(oldHelthId)
	if (!old || old.campIds.length) {
		if (!old) {
			const {
				food,
				chronicDisease,
				medicine,
				extra,
				isWearing,
				spicy,
				foodConcern,
			} = helthIsueBody
			const helth = await HelthIsue.create({
				food,
				chronicDisease,
				medicine,
				extra,
				isWearing,
				spicy,
				foodConcern,
				userId: user._id,
			});
			await user.updateOne({
				helthIsueId: helth._id
			});
			var i = 0
			while (i < user.shertManageIds.length) {
				const shertManage = await ShertManage.findById(user.shertManageIds[i++])
				switch (shertManage.role) {
					case "nong": {
						const nongCamp = await NongCamp.findById(shertManage.campModelId)
						if (!nongCamp) {
							continue
						}
						const camp = await Camp.findById(nongCamp.campId)
						if (!camp || camp.dataLock) {
							continue
						}
						const baan = await Baan.findById(nongCamp.baanId)
						if (!baan) {
							continue
						}
						await camp.updateOne({
							nongHelthIsueIds: swop(null, helth._id, camp.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(null, shertManage._id, camp.nongShertManageHaveHelthIshueIds),
						})
						await baan.updateOne({
							nongHelthIsueIds: swop(null, helth._id, baan.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(null, shertManage._id, baan.nongShertManageHaveHelthIshueIds),
						})
						await helth.updateOne({
							shertManageIds: swop(null, shertManage._id, helth.shertManageIds),
						})
						await shertManage.updateOne({ helthIshueId: helth._id })
						break
					}
					case "pee": {
						const peeCamp = await PeeCamp.findById(shertManage.campModelId)
						if (!peeCamp) {
							continue
						}
						const camp = await Camp.findById(peeCamp.campId)
						if (!camp || camp.peeDataLock) {
							continue
						}
						const baan = await Baan.findById(peeCamp.baanId)
						const part = await Part.findById(peeCamp.partId)
						if (!baan || !part) {
							continue
						}
						await camp.updateOne({
							peeHelthIsueIds: swop(null, helth._id, camp.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(null, shertManage._id, camp.peeShertManageHaveHelthIshueIds)
						})
						await baan.updateOne({
							peeHelthIsueIds: swop(null, helth._id, baan.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(null, shertManage._id, baan.peeShertManageHaveHelthIshueIds)
						})
						await part.updateOne({
							peeHelthIsueIds: swop(null, helth._id, baan.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(null, shertManage._id, part.peeShertManageHaveHelthIshueIds)
						})
						await helth.updateOne({
							shertManageIds: swop(null, shertManage._id, helth.shertManageIds),
						})
						await shertManage.updateOne({ helthIshueId: helth._id })
						break
					}
					case "peto": {
						const petoCamp = await PetoCamp.findById(user.petoCampIds[i++])
						if (!petoCamp) {
							continue
						}
						const camp = await Camp.findById(petoCamp.campId)
						if (!camp || camp.petoDataLock) {
							continue
						}
						const part = await Part.findById(petoCamp.partId)
						if (!part) {
							continue
						}
						await camp.updateOne({
							petoHelthIsueIds: swop(null, helth._id, camp.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(null, shertManage._id, part.petoShertManageHaveHelthIshueIds),
						})
						await part.updateOne({
							petoHelthIsueIds: swop(null, helth._id, part.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(null, shertManage._id, part.petoShertManageHaveHelthIshueIds),
						})
						await helth.updateOne({
							shertManageIds: swop(null, shertManage._id, helth.shertManageIds),
						})
						await shertManage.updateOne({ helthIshueId: helth._id })
						break
					}
				}
			}
			sendRes(res, true)
			return
		}
		if (!helthIsueBody.food.localeCompare('') && !helthIsueBody.medicine.localeCompare('') && !helthIsueBody.chronicDisease.localeCompare('') && !helthIsueBody.foodConcern.localeCompare('') && !helthIsueBody.spicy && !helthIsueBody.isWearing) {
			var i = 0
			while (i < old.shertManageIds.length) {
				const shertManage = await ShertManage.findById(old.shertManageIds[i++])
				if (!shertManage) {
					continue
				}
				switch (shertManage.role) {
					case "nong": {
						const nongCamp = await NongCamp.findById(shertManage.campModelId)
						if (!nongCamp) {
							continue
						}
						const camp = await Camp.findById(nongCamp.campId)
						const baan = await Baan.findById(nongCamp.baanId)
						if (!baan || !camp) {
							continue
						}
						await camp.updateOne({
							nongHelthIsueIds: swop(old._id, null, camp.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.nongShertManageHaveHelthIshueIds),
						})
						await baan.updateOne({
							nongHelthIsueIds: swop(old._id, null, baan.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(shertManage._id, null, baan.nongShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
					case "pee": {
						const peeCamp = await PeeCamp.findById(shertManage.campModelId)
						if (!peeCamp) {
							continue
						}
						const camp = await Camp.findById(peeCamp.campId)
						const baan = await Baan.findById(peeCamp.baanId)
						const part = await Part.findById(peeCamp.partId)
						if (!baan || !camp || !part) {
							continue
						}
						await camp.updateOne({
							peeHelthIsueIds: swop(old._id, null, camp.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.peeShertManageHaveHelthIshueIds),
						})
						await baan.updateOne({
							peeHelthIsueIds: swop(old._id, null, baan.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, baan.peeShertManageHaveHelthIshueIds),
						})
						await part.updateOne({
							peeHelthIsueIds: swop(old._id, null, part.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, part.peeShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
					case "peto": {
						const petoCamp = await PetoCamp.findById(shertManage.campModelId)
						if (!petoCamp) {
							continue
						}
						const camp = await Camp.findById(petoCamp.campId)
						const part = await Part.findById(petoCamp.partId)
						if (!camp || !part) {
							continue
						}
						await camp.updateOne({
							petoHelthIsueIds: swop(old._id, null, camp.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.petoShertManageHaveHelthIshueIds),
						})
						await part.updateOne({
							petoHelthIsueIds: swop(old._id, null, part.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(shertManage._id, null, part.petoShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
				}
			}
			await user.updateOne({ helthIsueId: null })
			await old.deleteOne()
			sendRes(res, true)
			return
		}
		const {
			food,
			chronicDisease,
			medicine,
			extra,
			isWearing,
			spicy,
			foodConcern,
		} = helthIsueBody
		const helth = await HelthIsue.create({
			food,
			chronicDisease,
			medicine,
			extra,
			isWearing,
			spicy,
			foodConcern,
			userId: user._id,
			shertManageIds: old.shertManageIds,
		});
		await user.updateOne({
			helthIsueId: helth._id
		});
		var i = 0
		while (i < old.shertManageIds.length) {
			const shertManage = await ShertManage.findById(old.shertManageIds[i++])
			if (!shertManage) {
				continue
			}
			switch (shertManage.role) {
				case "nong": {
					const nongCamp = await NongCamp.findById(shertManage.campModelId)
					if (!nongCamp) {
						continue
					}
					const camp = await Camp.findById(nongCamp.campId)
					const baan = await Baan.findById(nongCamp.baanId)
					if (!baan || !camp) {
						continue
					}
					await camp.updateOne({ nongHelthIsueIds: swop(old._id, helth._id, camp.nongHelthIsueIds) })
					await baan.updateOne({ nongHelthIsueIds: swop(old._id, helth._id, baan.nongHelthIsueIds) })
					await shertManage.updateOne({ helthIshueId: helth._id })
					break
				}
				case "pee": {
					const peeCamp = await PeeCamp.findById(shertManage.campModelId)
					if (!peeCamp) {
						continue
					}
					const camp = await Camp.findById(peeCamp.campId)
					const baan = await Baan.findById(peeCamp.baanId)
					const part = await Part.findById(peeCamp.partId)
					if (!baan || !camp || !part) {
						continue
					}
					await camp.updateOne({ peeHelthIsueIds: swop(old._id, helth._id, camp.peeHelthIsueIds) })
					await baan.updateOne({ peeHelthIsueIds: swop(old._id, helth._id, baan.peeHelthIsueIds) })
					await part.updateOne({ peeHelthIsueIds: swop(old._id, helth._id, part.peeHelthIsueIds) })
					await shertManage.updateOne({ helthIshueId: helth._id })
					break
				}
				case "peto": {
					const petoCamp = await PetoCamp.findById(shertManage.campModelId)
					if (!petoCamp) {
						continue
					}
					const camp = await Camp.findById(petoCamp.campId)
					const part = await Part.findById(petoCamp.partId)
					if (!camp || !part) {
						continue
					}
					await camp.updateOne({ petoHelthIsueIds: swop(old._id, helth._id, camp.petoHelthIsueIds) })
					await part.updateOne({ petoHelthIsueIds: swop(old._id, helth._id, part.petoHelthIsueIds) })
					await shertManage.updateOne({ helthIshueId: helth._id })
				}
			}
		}
	} else {
		const helth = await HelthIsue.findByIdAndUpdate(user?.helthIsueId, helthIsueBody);
		await revalidaionHelthIshues([helth._id])
		res.status(200).json(helth?.toObject());
	}
}
export async function updateBottle(req: express.Request, res: express.Response, next: express.NextFunction) {
	const old = await getUser(req)
	if (!old) {
		sendRes(res, false)
		return
	}
	const oldBottle = old?.haveBottle
	const user = await User.findByIdAndUpdate(old._id, {
		haveBottle: !oldBottle
	});
	if (!user) {
		sendRes(res, false)
		return
	}
	var i = 0
	while (i < user.shertManageIds.length) {
		const shertManage = await ShertManage.findById(user.shertManageIds[i++])
		if (!shertManage) {
			continue
		}
		switch (shertManage.role) {
			case 'nong': {
				const nongCamp = await NongCamp.findById(shertManage.campModelId)
				if (!nongCamp) {
					continue
				}
				const camp = await Camp.findById(nongCamp.campId)
				if (!camp || camp.dataLock) {
					continue
				}
				const baan = await Baan.findById(nongCamp.baanId);
				if (!baan) {
					continue
				}
				await shertManage.updateOne({ haveBottle: !oldBottle })
				if (oldBottle) {
					await camp.updateOne({ nongHaveBottleIds: swop(user._id, null, camp.nongHaveBottleIds) });
					await baan.updateOne({ nongHaveBottleIds: swop(user._id, null, baan.nongHaveBottleIds) })
				} else {
					await camp.updateOne({ nongHaveBottleIds: swop(null, user._id, camp.nongHaveBottleIds) });
					await baan.updateOne({ nongHaveBottleIds: swop(null, user._id, baan.nongHaveBottleIds) })
				}
				break

			}
			case 'pee': {
				const peeCamp = await PeeCamp.findById(shertManage.campModelId)
				if (!peeCamp) {
					continue
				}
				const camp = await Camp.findById(peeCamp.campId)
				if (!camp || camp.peeDataLock) {
					continue
				}
				const baan = await Baan.findById(peeCamp.baanId);
				const part = await Part.findById(peeCamp.partId)
				if (!baan || !part) {
					continue
				}
				await shertManage.updateOne({ haveBottle: !oldBottle })
				if (oldBottle) {
					await camp.updateOne({ peeHaveBottleIds: swop(user._id, null, camp.peeHaveBottleIds) })
					await baan.updateOne({ peeHaveBottleIds: swop(user._id, null, baan.peeHaveBottleIds) })
					await part.updateOne({ peeHaveBottleIds: swop(user._id, null, part.peeHaveBottleIds) })
				} else {
					await camp.updateOne({ peeHaveBottleIds: swop(null, user._id, camp.peeHaveBottleIds) })
					await baan.updateOne({ peeHaveBottleIds: swop(null, user._id, baan.peeHaveBottleIds) })
					await part.updateOne({ peeHaveBottleIds: swop(null, user._id, part.peeHaveBottleIds) })
				}
				break
			}
			case 'peto': {
				const petoCamp = await PetoCamp.findById(shertManage.campModelId)
				if (!petoCamp) {
					continue
				}
				const camp = await Camp.findById(petoCamp.campId)
				if (!camp || camp.petoDataLock) {
					continue
				}
				const part = await Part.findById(petoCamp.partId)
				if (!part) {
					continue
				}
				await shertManage.updateOne({ haveBottle: !oldBottle })
				if (oldBottle) {
					await camp.updateOne({ petoHaveBottleIds: swop(user._id, null, camp.petoHaveBottleIds) })
					await part.updateOne({ petoHaveBottleIds: swop(user._id, null, part.petoHaveBottleIds) })
				} else {
					await camp.updateOne({ petoHaveBottleIds: swop(null, user._id, camp.petoHaveBottleIds) })
					await part.updateOne({ petoHaveBottleIds: swop(null, user._id, part.petoHaveBottleIds) })
				}
				break
			}
		}
	}
	res.status(200).json({
		success: true,
		user,
	});
}
export async function getShertManageByCampId(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	const campId: string = req.params.id
	const camp = await Camp.findById(campId)
	const shertManage = await ShertManage.findById(camp?.mapShertManageIdByUserId.get(user?.id))
	res.status(200).json(shertManage)
}
export async function updateProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	const { email, tel, name, nickname, lastname, citizenId } = req.body
	await user?.updateOne({ email, tel, name, nickname, lastname, citizenId })
	res.status(200).json(user)
}
export async function changeModeToPee(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	try {
		if (!user || user.role == 'nong') {
			sendRes(res, false)
			return
		}
		const password = req.params.id
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			sendRes(res, false)
			return
		}
		await user.updateOne({ mode: 'pee' })
		sendRes(res, true)
	} catch (err) {
		console.log(err)
		sendRes(res, false)
	}
}
export async function checkTel(req: express.Request, res: express.Response, next: express.NextFunction) {
	//type FindMode='h=>nong,f=>nong'|'h=>nong,f=>pee'|'h=>nong,f=>peto'|'h=>pee,f=>nong'|'h=>pee,f=>pee'|'h=>pee,f=>peto'|'h=>peto,f=>nong'|'h=>peto,f=>pee'|'h=>peto,f=>peto'
	const findUser = await User.findOne({ tel: req.params.id })
	const host = await getUser(req)
	//console.log(findUser)
	var relation: string[] = []
	if (!host || !findUser) {
		res.status(400).json({ relation })
		return
	}
	var i = 0
	//const map=new Map<string,FindMode>()
	while (i < host.nongCampIds.length) {
		const nongCamp = await NongCamp.findById(host.nongCampIds[i++])
		if (!nongCamp) {
			continue
		}
		const camp = await Camp.findById(nongCamp.campId)
		if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
			continue
		}
		const shertManage = await ShertManage.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))
		if (!shertManage) {
			continue
		}
		switch (shertManage.role) {
			case 'nong': {
				const findnongCamp = await NongCamp.findById(shertManage.campModelId)
				const findbaan = await Baan.findById(findnongCamp?.baanId)
				relation.push(`เพื่อนชื่อ${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name}`)
				break
			}
			case 'pee': {
				const findPeeCamp = await PeeCamp.findById(shertManage.campModelId)
				const findbaan = await Baan.findById(findPeeCamp?.baanId)
				relation.push(`พี่ชื่อ${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name}`)
				break
			}
			case 'peto': {
				relation.push(`พี่ชื่อ${findUser.nickname} จากค่าย${camp.campName}`)
				break
			}
		}
	}
	i = 0
	while (i < host.peeCampIds.length) {
		const peeCamp = await PeeCamp.findById(host.peeCampIds[i++])
		if (!peeCamp) {
			continue
		}
		const camp = await Camp.findById(peeCamp.campId)
		if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
			continue
		}
		const shertManage = await ShertManage.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))
		if (!shertManage) {
			continue
		}
		switch (shertManage.role) {
			case 'nong': {
				const findnongCamp = await NongCamp.findById(shertManage.campModelId)

				const findbaan = await Baan.findById(findnongCamp?.baanId)
				relation.push(`น้อง${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name}`)
				break
			}
			case 'pee': {
				const findPeeCamp = await PeeCamp.findById(shertManage.campModelId)

				const findbaan = await Baan.findById(findPeeCamp?.baanId)
				const findPart = await Part.findById(findPeeCamp?.partId)
				relation.push(`เพื่อนชื่อ${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name} ฝ่าย${findPart?.partName}`)
				break
			}
			case 'peto': {
				const findPeeCamp = await PetoCamp.findById(shertManage.campModelId)
				const findPart = await Part.findById(findPeeCamp?.partId)
				relation.push(`พี่ปีโตชื่อ${findUser.nickname} จากค่าย${camp.campName} ฝ่าย${findPart?.partName}`)
				break
			}
		}
	}
	i = 0
	while (i < host.petoCampIds.length) {
		const petoCamp = await PetoCamp.findById(host.petoCampIds[i++])
		if (!petoCamp) {
			continue
		}
		const camp = await Camp.findById(petoCamp.campId)
		if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
			continue
		}
		const shertManage = await ShertManage.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))
		if (!shertManage) {
			continue
		}
		switch (shertManage.role) {
			case 'nong': {
				const findnongCamp = await NongCamp.findById(shertManage.campModelId)

				const findbaan = await Baan.findById(findnongCamp?.baanId)
				relation.push(`น้อง${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name}`)
				break
			}
			case 'pee': {
				const findPeeCamp = await PeeCamp.findById(shertManage.campModelId)
				const findbaan = await Baan.findById(findPeeCamp?.baanId)
				const findPart = await Part.findById(findPeeCamp?.partId)
				relation.push(`น้องปี1ชื่อ${findUser.nickname} จากค่าย${camp.campName} บ้าน${findbaan?.name} ฝ่าย${findPart?.partName}`)
				break
			}
			case 'peto': {
				const findPeeCamp = await PetoCamp.findById(shertManage.campModelId)
				const findPart = await Part.findById(findPeeCamp?.partId)
				relation.push(`เพื่อนชื่อ${findUser.nickname} จากค่าย${camp.campName} ฝ่าย${findPart?.partName}`)
				break
			}
		}
	}
	res.status(200).json({
		relation
	})
}
export async function updateSleep(req: express.Request, res: express.Response, next: express.NextFunction) {
	const old = await getUser(req)
	if (!old) {
		sendRes(res, false)
		return
	}
	const oldSleep = old?.likeToSleepAtCamp
	const user = await User.findByIdAndUpdate(old._id, {
		likeToSleepAtCamp: !oldSleep
	});
	if (!user) {
		sendRes(res, false)
		return
	}
	var i = 0
	while (i < user.shertManageIds.length) {
		const shertManage = await ShertManage.findById(user.shertManageIds[i++])
		if (!shertManage) {
			continue
		}
		switch (shertManage.role) {
			case 'nong': {
				const nongCamp = await NongCamp.findById(shertManage.campModelId)
				if (!nongCamp) {
					continue
				}
				const camp = await Camp.findById(nongCamp.campId)
				if (!camp || camp.dataLock || camp.nongSleepModel !== 'เลือกได้ว่าจะค้างคืนหรือไม่') {
					continue
				}
				const baan = await Baan.findById(nongCamp.baanId);
				if (!baan) {
					continue
				}
				await shertManage.updateOne({ sleepAtCamp: !oldSleep })
				if (oldSleep) {
					await camp.updateOne({ nongSleepIds: swop(user._id, null, camp.nongSleepIds) });
					await baan.updateOne({ nongSleepIds: swop(user._id, null, baan.nongSleepIds) })

				} else {
					await camp.updateOne({ nongSleepIds: swop(null, user._id, camp.nongSleepIds) });
					await baan.updateOne({ nongSleepIds: swop(null, user._id, baan.nongSleepIds) })
				}
				break

			}
			case 'pee': {
				const peeCamp = await PeeCamp.findById(shertManage.campModelId)
				if (!peeCamp) {
					continue
				}
				const camp = await Camp.findById(peeCamp.campId)
				if (!camp || camp.peeDataLock || camp.peeSleepModel != 'เลือกได้ว่าจะค้างคืนหรือไม่') {
					continue
				}
				const baan = await Baan.findById(peeCamp.baanId);
				const part = await Part.findById(peeCamp.partId)
				if (!baan || !part) {
					continue
				}
				await shertManage.updateOne({ sleepAtCamp: !oldSleep })
				if (oldSleep) {
					await camp.updateOne({ peeSleepIds: swop(user._id, null, camp.peeSleepIds) })
					await baan.updateOne({ peeSleepIds: swop(user._id, null, baan.peeSleepIds) })
					await part.updateOne({ peeSleepIds: swop(user._id, null, part.peeSleepIds) })
				} else {
					await camp.updateOne({ peeSleepIds: swop(null, user._id, camp.peeSleepIds) })
					await baan.updateOne({ peeSleepIds: swop(null, user._id, baan.peeSleepIds) })
					await part.updateOne({ peeSleepIds: swop(null, user._id, part.peeSleepIds) })
				}
				break
			}
			case 'peto': {
				const petoCamp = await PetoCamp.findById(shertManage.campModelId)
				if (!petoCamp) {
					continue
				}
				const camp = await Camp.findById(petoCamp.campId)
				if (!camp || camp.petoDataLock || camp.peeSleepModel !== 'เลือกได้ว่าจะค้างคืนหรือไม่') {
					continue
				}
				const part = await Part.findById(petoCamp.partId)
				if (!part) {
					continue
				}
				await shertManage.updateOne({ sleepAtCamp: !oldSleep })
				if (oldSleep) {
					await camp.updateOne({ petoSleepIds: swop(user._id, null, camp.petoSleepIds) })
					await part.updateOne({ petoSleepIds: swop(user._id, null, part.petoSleepIds) })
				} else {
					await camp.updateOne({ petoSleepIds: swop(null, user._id, camp.petoSleepIds) })
					await part.updateOne({ petoSleepIds: swop(null, user._id, part.petoSleepIds) })
				}
				break
			}
		}
	}
	res.status(200).json({
		success: true,
		user,
	});
}
export async function getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json(user)
	} catch (err) {
		console.log(err)
		sendRes(res, false)
	}
}
export async function getShertmanage(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const shertManage = await ShertManage.findById(req.params.id)
		res.status(200).json(shertManage)
	} catch (err) {
		console.log(err)
		sendRes(res, false)
	}

}
export async function updateTimeOffset(req: express.Request, res: express.Response, next: express.NextFunction) {
	const update: UpdateTimeOffset = req.body
	const user = await getUser(req)
	if (!user) {
		sendRes(res, false)
		return
	}
	await TimeOffset.findByIdAndUpdate(user.displayOffsetId, update.display)
	await TimeOffset.findByIdAndUpdate(user.selectOffsetId, update.select)
	sendRes(res, true)
}
export async function getTimeOffset(req: express.Request, res: express.Response, next: express.NextFunction) {
	try{
		const buf = await TimeOffset.findById(req.params.id)
	res.status(200).json(buf)
	}catch(e){
		sendRes(res,false)
	}
	
}
export async function signId(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	if (!user || user.email.split('@')[1].localeCompare('student.chula.ac.th')) {
		sendRes(res, false)
		return
	}
	const salt = await bcrypt.genSalt(10)
	const text = await bcrypt.hash(user._id.toString(), salt)
	sendingEmail(user.email, jwt.sign({ password: text }, buf))
	sendRes(res, true)
}
export async function verifyEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	if (!user) {
		sendRes(res, false)
		return
	}
	try {
		const { password } = jwt.verify(req.body.password, buf) as any
		const correct = await bcrypt.compare(user._id.toString(), password)
		if (!correct) {
			sendRes(res, false)
			return
		}
		await user.updateOne({
			fridayActEn: true,
			studentId: user.email.split('@')[0]
		})
		sendRes(res, true)
	} catch (error) {
		console.error(error)
		sendRes(res, false)
	}

}
export async function revalidaionHelthIshues(ids: mongoose.Types.ObjectId[]) {
	var i = 0
	while (i < ids.length) {
		const old = await HelthIsue.findById(ids[i++])
		if (!old) {
			continue
		}
		if (old.campIds.length) {
			continue
		}
		const user = await User.findById(old.userId)
		if (!user) {
			continue
		}
		if (!old._id.equals(user.helthIsueId)) {
			await old.deleteOne()
			continue
		}
		if (!old.food.localeCompare('') && !old.medicine.localeCompare('') && !old.chronicDisease.localeCompare('') && !old.foodConcern.localeCompare('') && !old.spicy && !old.isWearing) {
			var j = 0
			while (j < old.shertManageIds.length) {
				const shertManage = await ShertManage.findById(old.shertManageIds[j++])
				if (!shertManage) {
					continue
				}
				switch (shertManage.role) {
					case "nong": {
						const nongCamp = await NongCamp.findById(shertManage.campModelId)
						if (!nongCamp) {
							continue
						}
						const camp = await Camp.findById(nongCamp.campId)
						const baan = await Baan.findById(nongCamp.baanId)
						if (!baan || !camp) {
							continue
						}
						await camp.updateOne({
							nongHelthIsueIds: swop(old._id, null, camp.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.nongShertManageHaveHelthIshueIds),
						})
						await baan.updateOne({
							nongHelthIsueIds: swop(old._id, null, baan.nongHelthIsueIds),
							nongShertManageHaveHelthIshueIds: swop(shertManage._id, null, baan.nongShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
					case "pee": {
						const peeCamp = await PeeCamp.findById(shertManage.campModelId)
						if (!peeCamp) {
							continue
						}
						const camp = await Camp.findById(peeCamp.campId)
						const baan = await Baan.findById(peeCamp.baanId)
						const part = await Part.findById(peeCamp.partId)
						if (!baan || !camp || !part) {
							continue
						}
						await camp.updateOne({
							peeHelthIsueIds: swop(old._id, null, camp.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.peeShertManageHaveHelthIshueIds),
						})
						await baan.updateOne({
							peeHelthIsueIds: swop(old._id, null, baan.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, baan.peeShertManageHaveHelthIshueIds),
						})
						await part.updateOne({
							peeHelthIsueIds: swop(old._id, null, part.peeHelthIsueIds),
							peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, part.peeShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
					case "peto": {
						const petoCamp = await PetoCamp.findById(shertManage.campModelId)
						if (!petoCamp) {
							continue
						}
						const camp = await Camp.findById(petoCamp.campId)
						const part = await Part.findById(petoCamp.partId)
						if (!camp || !part) {
							continue
						}
						await camp.updateOne({
							petoHelthIsueIds: swop(old._id, null, camp.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(shertManage._id, null, camp.petoShertManageHaveHelthIshueIds),
						})
						await part.updateOne({
							petoHelthIsueIds: swop(old._id, null, part.petoHelthIsueIds),
							petoShertManageHaveHelthIshueIds: swop(shertManage._id, null, part.petoShertManageHaveHelthIshueIds),
						})
						await shertManage.updateOne({ helthIshueId: null })
						break
					}
				}
			}
			await user.updateOne({ helthIsueId: null })
			await old.deleteOne()
		}
	}
}
export async function checkPassword(req: express.Request, res: express.Response, next: express.NextFunction){
	const user=await getUser(req)
	if(!user){
		sendRes(res,false)
	}
	const isMatch=await bcrypt.compare(req.body.password,user.password)
	sendRes(res,isMatch)
}