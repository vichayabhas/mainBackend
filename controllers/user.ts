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
import { sendRes, swop } from "./setup";
import express from "express";
import bcrypt from "bcrypt"
import { InterBaanBack, InterPartBack, InterUser, Register } from "../models/intreface";
import jwt from 'jsonwebtoken'
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
	const token = jwt.sign({ id: user.id }, buf, {
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
		filter
	} = req.body;
	const user = await User.findByIdAndUpdate((await getUser(req))?.id, {
		mode,
		filter
	});
	res.status(200).json(user);
}
export async function updateSize(req: express.Request, res: express.Response, next: express.NextFunction) {
	const shertSize = req.params.id;
	//console.log(shertSize)
	const old = await getUser(req)
	const oldSize = old?.shertSize;
	if (shertSize) {
		const user = await User.findByIdAndUpdate(old?.id, {
			shertSize
		});
		user?.shertManageIds.forEach(async (shertManageId) => {
			const shertManage = await ShertManage.findById(shertManageId)
			switch (shertManage?.role) {
				case 'nong': {
					const nongCamp = await NongCamp.findById(shertManage.campModelId)
					const camp = await Camp.findById(nongCamp?.campId)
					if (!camp?.dataLock) {
						await shertManage.updateOne({ size: shertSize })
						const baan = await Baan.findById(nongCamp?.baanId);
						const oldc: any = camp?.nongShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.nongShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldc - 1);
						const newc: any = camp?.nongShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.nongShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newc + 1);
						const oldb: any = baan?.nongShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						baan?.nongShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldb - 1);
						const newb: any = baan?.nongShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						baan?.nongShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newb + 1);
					}
					break;
				}
				case 'pee': {
					const peeCamp = await PeeCamp.findById(shertManage.campModelId)
					const camp = await Camp.findById(peeCamp?.campId)
					if (!camp?.dataLock) {
						const baan = await Baan.findById(peeCamp?.baanId);
						const part = await Part.findById(peeCamp?.partId);
						const oldc: any = camp?.peeShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.peeShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldc - 1);
						const newc: any = camp?.peeShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.peeShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newc + 1);
						const oldb: any = baan?.peeShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						baan?.peeShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldb - 1);
						const newb: any = baan?.peeShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						baan?.peeShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newb + 1);
						const oldp: any = part?.peeShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						part?.peeShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldp - 1);
						const newp: any = part?.peeShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						part?.peeShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newp + 1);
						await shertManage.updateOne({ size: shertSize })
					}
					break;
				}
				case 'peto': {
					const petoCamp = await PetoCamp.findById(shertManage?.campModelId);
					const camp = await Camp.findById(petoCamp?.campId);
					if (!camp?.dataLock) {
						const part = await Part.findById(petoCamp?.partId);
						const oldc: any = camp?.petoShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.petoShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldc - 1);
						const newc: any = camp?.petoShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						camp?.petoShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newc + 1);
						const oldp: any = part?.petoShertSize.get(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						part?.petoShertSize.set(oldSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', oldp - 1);
						const newp: any = part?.petoShertSize.get(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL');
						part?.petoShertSize.set(user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', newp + 1);
						await shertManage?.updateOne({ size: shertSize })
					}
					break;
				}
			}
		})
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
	const oldHelthId = user?.helthIsueId
	if (await findLock(user?._id.toString(), oldHelthId as string)) {
		const helth = await HelthIsue.create(req.body);
		await user?.updateOne({
			helthIsueId: helth.id
		});
		user?.nongCampIds.forEach(async (nongCampId: string) => {
			const nongCamp = await NongCamp.findById(nongCampId);
			const camp = await Camp.findById(nongCamp?.campId);
			if (!camp?.dataLock) {
				const baan = await Baan.findById(nongCamp?.baanId);
				await camp?.updateOne({
					nongHelthIsueIds: swop(oldHelthId as string, helth.id, camp.nongHelthIsueIds)
				});
				await baan?.updateOne({
					nongHelthIsueIds: swop(oldHelthId as string, helth.id, baan.nongHelthIsueIds)
				});
			}
		});
		user?.peeCampIds.forEach(async (peeCampId) => {
			const peeCamp = await PeeCamp.findById(peeCampId)
			const camp = await Camp.findById(peeCamp?.campId)
			if (!camp?.dataLock) {
				const baan = await Baan.findById(peeCamp?.baanId)
				const part = await Part.findById(peeCamp?.partId)
				await baan?.updateOne({
					peeHelthIsueIds: swop(oldHelthId as string, helth.id, baan?.peeHelthIsueIds)
				})
				await part?.updateOne({
					peeHelthIsueIds: swop(oldHelthId as string, helth.id, part?.peeHelthIsueIds)
				})
				await camp?.updateOne({
					peeHelthIsueIds: swop(oldHelthId as string, helth.id, camp?.peeHelthIsueIds)
				})
			}
		})
		user?.petoCampIds.forEach(async (petoCampId) => {
			const petoCamp = await PeeCamp.findById(petoCampId)
			const camp = await Camp.findById(petoCamp?.campId)
			if (!camp?.dataLock) {
				const part = await Part.findById(petoCamp?.partId)
				await part?.updateOne({
					peeHelthIsueIds: swop(oldHelthId as string, helth.id, part?.peeHelthIsueIds)
				})
				await camp?.updateOne({
					peeHelthIsueIds: swop(oldHelthId as string, helth.id, camp?.peeHelthIsueIds)
				})
			}
		})
		res.status(200).json({
			success: true,
			data: helth
		});
	} else {
		const helth = await HelthIsue.findByIdAndUpdate(user?.helthIsueId, req.body);
		res.status(200).json(helth);
	}
}
async function findLock(userId: string | null | undefined, oldHelthId: string | null) {
	const user = await User.findById(userId);
	if (!oldHelthId) {
		return true
	}
	user?.nongCampIds.forEach(async (nongCampId) => {
		const nongCamp = await NongCamp.findById(nongCampId);
		const camp = await Camp.findById(nongCamp?.campId);
		if (camp?.nongHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true;
		}
	});
	user?.peeCampIds.forEach(async (peeCampId) => {
		const peeCamp = await PeeCamp.findById(peeCampId);
		const camp = await Camp.findById(peeCamp?.campId);
		if (camp?.peeHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true;
		}
	});
	user?.petoCampIds.forEach(async (petoCampId) => {
		const petoCamp = await PetoCamp.findById(petoCampId);
		const camp = await Camp.findById(petoCamp?.campId);
		if (camp?.petoHelthIsueIds.includes(oldHelthId) && camp?.dataLock) {
			return true;
		}
	});
	return false;
}
export async function updateBottle(req: express.Request, res: express.Response, next: express.NextFunction) {
	const old = await getUser(req)
	const oldBottle = old?.haveBottle
	var change = 1
	if (oldBottle) {
		change = -1
	}
	const user = await User.findByIdAndUpdate(old?._id, {
		haveBottle: !oldBottle
	});
	user?.nongCampIds.forEach(async (nongcampId) => {
		const nongCamp = await NongCamp.findById(nongcampId);
		const camp = await Camp.findById(nongCamp?.campId);
		if (!camp?.dataLock) {
			const baan = await Baan.findById(nongCamp?.baanId);
			await camp?.updateOne({
				nongHaveBottle: camp.nongHaveBottle + change
			});
			await baan?.updateOne({
				nongHaveBottle: baan.nongHaveBottle + change
			});
		}
	});
	user?.peeCampIds.forEach(async (peeCampId) => {
		const peeCamp = await PeeCamp.findById(peeCampId);
		const camp = await Camp.findById(peeCamp?.campId);
		if (!camp?.dataLock) {
			const baan = await Baan.findById(peeCamp?.baanId);
			const part = await Part.findById(peeCamp?.partId);
			await camp?.updateOne({
				peeHaveBottle: camp.peeHaveBottle + change
			})
			await baan?.updateOne({
				peeHaveBottle: baan.peeHaveBottle + change
			})
			await part?.updateOne({
				peeHaveBottle: part.peeHaveBottle + change
			})
		}
	});
	user?.petoCampIds.forEach(async (petoCampId) => {
		const petoCamp = await PetoCamp.findById(petoCampId);
		const camp = await Camp.findById(petoCamp?.campId);
		if (!camp?.dataLock) {
			const part = await Part.findById(petoCamp?.partId);
			await camp?.updateOne({
				peeHaveBottle: camp.peeHaveBottle + change
			})
			await part?.updateOne({
				peeHaveBottle: part.peeHaveBottle + change
			})
		}
	});
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
export async function getSameWearing(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	var sames: InterUser[] = []
	user?.shertManageIds.forEach(async (shertManageId: string) => {
		const shertManage = await ShertManage.findById(shertManageId);
		switch (shertManage?.role) {
			case 'nong': {
				const nongCamp = await NongCamp.findById(shertManage.campModelId);
				const nong = await getSameWearingRaw(nongCamp?.id, []);
				nong.forEach((u) => {
					sames.push(u);
				});
			}
			case 'pee': {
				const peeCamp = await PeeCamp.findById(shertManage.campModelId)
				const nong = await getSameWearingRaw(peeCamp?.id, []);
				nong.forEach((u) => {
					sames.push(u);
				});
			}
			case 'peto': {
				const peeCamp = await PetoCamp.findById(shertManage.campModelId)
				const nong = await getSameWearingRaw(peeCamp?.id, []);
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
}
export async function updateProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user = await getUser(req)
	const { email, tel } = req.body
	await user?.updateOne({ email, tel })
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
		//console.log(password)
		//console.log(user)
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			sendRes(res, false)
			return
		}
		await user.updateOne({ mode: 'pee' })
		sendRes(res,true)
	} catch (err) {
		console.log(err)
		//console.log('tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
		sendRes(res, false)
	}


}
