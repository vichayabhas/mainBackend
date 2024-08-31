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
// exports.register             
// exports.login
// exports.getMe               protect
// exports.logout
// exports.updateMode          protect pee up
// exports.updateSize          protect           params id
// exports.getHelthIsue        protect           params id
// exports.updateHelth         protect           params id
// exports.updateBottle        protect
// export async function getShertManageByCampId
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
	if (await findLock(user._id, oldHelthId)) {
		const helth = await HelthIsue.create(helthIsueBody);
		await user.updateOne({
			helthIsueId: helth._id
		});
		var i = 0
		while (i < user.nongCampIds.length) {
			const nongCamp = await NongCamp.findById(user.nongCampIds[i++])
			if (!nongCamp) {
				continue
			}
			const baan = await Baan.findById(nongCamp.baanId);
			const camp = await Camp.findById(nongCamp.campId);
			if (!camp || camp.dataLock || !baan) {
				continue
			}
			await camp.updateOne({
				nongHelthIsueIds: swop(oldHelthId, helth._id, camp.nongHelthIsueIds)
			});
			await baan.updateOne({
				nongHelthIsueIds: swop(oldHelthId, helth._id, baan.nongHelthIsueIds)
			});
		}
		i = 0
		while (i < user.peeCampIds.length) {
			const peeCamp = await PeeCamp.findById(user.peeCampIds[i++])
			if (!peeCamp) {
				continue
			}
			const baan = await Baan.findById(peeCamp.baanId);
			const camp = await Camp.findById(peeCamp.campId);
			const part = await Part.findById(peeCamp.partId)
			if (!camp || camp.dataLock || !baan || !part) {
				continue
			}
			await camp.updateOne({
				peeHelthIsueIds: swop(oldHelthId, helth._id, camp.peeHelthIsueIds)
			});
			await baan.updateOne({
				peeHelthIsueIds: swop(oldHelthId, helth._id, baan.peeHelthIsueIds)
			});
			await part.updateOne({
				peeHelthIsueIds: swop(oldHelthId, helth._id, part.peeHelthIsueIds)
			});
		}
		i = 0
		while (i < user.petoCampIds.length) {
			const petoCamp = await PetoCamp.findById(user.petoCampIds[i++])
			if (!petoCamp) {
				continue
			}
			const camp = await Camp.findById(petoCamp.campId);
			const part = await Part.findById(petoCamp.partId)
			if (!camp || camp.dataLock || !part) {
				continue
			}
			await camp.updateOne({
				petoHelthIsueIds: swop(oldHelthId, helth._id, camp.petoHelthIsueIds)
			});
			await part.updateOne({
				petoHelthIsueIds: swop(oldHelthId, helth._id, part.petoHelthIsueIds)
			});
		}
		res.status(200).json({
			success: true,
			data: helth
		});
	} else {
		const helth = await HelthIsue.findByIdAndUpdate(user?.helthIsueId, helthIsueBody);
		res.status(200).json(helth?.toObject());
	}
}
async function findLock(userId: mongoose.Types.ObjectId | null | undefined, oldHelthId: mongoose.Types.ObjectId | null): Promise<boolean> {
	const user = await User.findById(userId);
	if (!oldHelthId || !user) {
		return true
	}
	var i: number
	i = 0
	while (i < user.nongCampIds.length) {
		const nongCamp = await NongCamp.findById(user.nongCampIds[i++])
		if (!nongCamp) {
			continue
		}
		const camp = await Camp.findById(nongCamp.campId)
		if (!camp) {
			continue
		}
		if (camp.nongHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true
		}
	}
	i = 0
	while (i < user.peeCampIds.length) {
		const peeCamp = await PeeCamp.findById(user.peeCampIds[i++])
		if (!peeCamp) {
			continue
		}
		const camp = await Camp.findById(peeCamp.campId)
		if (!camp) {
			continue
		}
		if (camp.peeHelthIsueIds.includes(oldHelthId) && camp.peeDataLock) {
			return true
		}
	}
	i = 0
	while (i < user.petoCampIds.length) {
		const petoCamp = await PetoCamp.findById(user.petoCampIds[i++])
		if (!petoCamp) {
			continue
		}
		const camp = await Camp.findById(petoCamp.campId)
		if (!camp) {
			continue
		}
		if (camp.petoHelthIsueIds.includes(oldHelthId) && camp.petoDataLock) {
			return true
		}
	}
	return false;
}
export async function updateBottle(req: express.Request, res: express.Response, next: express.NextFunction) {
	const old = await getUser(req)
	if (!old) {
		sendRes(res, false)
		return
	}
	const oldBottle = old?.haveBottle
	var change = 1
	if (oldBottle) {
		change = -1
	}
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
				await camp.updateOne({
					nongHaveBottle: camp.nongHaveBottle + change
				});
				await baan.updateOne({
					nongHaveBottle: baan.nongHaveBottle + change
				});
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
				await camp.updateOne({
					peeHaveBottle: camp.peeHaveBottle + change
				});
				await baan.updateOne({
					peeHaveBottle: baan.peeHaveBottle + change
				});
				await part.updateOne({
					peeHaveBottle: part.peeHaveBottle + change
				});
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
				await camp.updateOne({
					petoHaveBottle: camp.petoHaveBottle + change
				});
				await part.updateOne({
					petoHaveBottle: part.petoHaveBottle + change
				});
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
}/*
export async function getSameWearing(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	var sames: InterUser[] = []
	user?.shertManageIds.forEach(async (shertManageId: string) => {
		const shertManage = await ShertManage.findById(shertManageId);
		switch (shertManage?.role) {
			case 'nong': {
				const nongCamp = await NongCamp.findById(shertManage.campModelId);
				const nong = await getSameWearingRaw(nongCamp?._id, []);
				nong.forEach((u) => {
					sames.push(u);
				});
			}
			case 'pee': {
				const peeCamp = await PeeCamp.findById(shertManage.campModelId)
				const nong = await getSameWearingRaw(peeCamp?._id, []);
				nong.forEach((u) => {
					sames.push(u);
				});
			}
			case 'peto': {
				const peeCamp = await PetoCamp.findById(shertManage.campModelId)
				const nong = await getSameWearingRaw(peeCamp?._id, []);
				nong.forEach((u) => {
					sames.push(u);
				});
			}
		}
	})
}
async function getSameWearingRaw(campId: string, sames: InterUser[]): Promise<InterUser[]> {
	const camp = await Camp.findById(campId)
	camp?.nongHelthIsueIds.forEach(async (helthIsueId: string) => {
		const helthIsue = await HelthIsue.findById(helthIsueId)
		if (helthIsue?.isWearing) {
			const user: InterUser | null = await User.findById(helthIsue.userId)
			if (user) {
				sames.push(user)
			}
		}
	})
	return sames
}*/
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
		//console.log('tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
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
					await camp.updateOne({
						nongSleepIds: swop(user._id, null, camp.nongSleepIds)

					});
					await baan.updateOne({
						nongSleepIds: swop(user._id, null, baan.nongSleepIds)
					})

				} else {
					await camp.updateOne({
						nongSleepIds: swop(null, user._id, camp.nongSleepIds)

					});
					await baan.updateOne({
						nongSleepIds: swop(null, user._id, baan.nongSleepIds)
					})
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
					await camp.updateOne({ peeSleepIds: swop(user._id, null, camp.peeSleepIds) })
					await part.updateOne({ peeSleepIds: swop(user._id, null, part.peeSleepIds) })
				} else {
					await camp.updateOne({ peeSleepIds: swop(null, user._id, camp.peeSleepIds) })
					await part.updateOne({ peeSleepIds: swop(null, user._id, part.peeSleepIds) })
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

		//console.log(user)
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
	const buf = await TimeOffset.findById(req.params.id)
	res.status(200).json(buf)
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