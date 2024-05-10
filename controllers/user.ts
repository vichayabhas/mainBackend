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
import { swop } from "./setup";
import { NextFunction } from 'express'
import express from "express";
import bcrypt from "bcrypt"


import { InterUser } from "../models/intreface";
import jwt from 'jsonwebtoken'
// exports.register             
// exports.login
// exports.getMe               protect
// exports.logout
// exports.getUser             protect lib
// exports.updateMode          protect pee up
// exports.updateSize          protect           params id
// exports.getHelthIsue        protect           params id
// exports.updateHelth         protect           params id
// exports.updateBottle        protect
export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const user = await User.create(req.body);
		sendTokenResponse(user as InterUser, 200, res);
	} catch (err) {
		res.status(400).json({
			success: false
		});
		//console.log(err.stack); 
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

	res.status(200).json({
		success: true,
		data: user
	});
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
	const user = await User.findByIdAndUpdate((await getUser(req))?._id, {
		mode,
		filter
	});
	res.status(200).json({
		success: true,
		user,
	});
}
export async function updateSize(req: express.Request, res: express.Response, next: express.NextFunction) {
	const {
		shertSize
	} = req.body;
	const old = await getUser(req)

	const oldSize = old?.shertSize;

	if (shertSize) {
		const user = await User.findByIdAndUpdate(old?._id, {
			shertSize
		});


		user?.shertManageIds.forEach(async (shertManageId) => {
			const shertManage = await ShertManage.findById(shertManageId)

			switch (shertManage?.role) {
				case 'nong': {
					const nongCamp = await NongCamp.findById(shertManage.campModelId)

					const camp = await Camp.findById(nongCamp?.campId)

					if (!camp?.dataLock) {
						shertManage.updateOne({ size: shertSize })
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
						shertManage.updateOne({ size: shertSize })
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
						shertManage?.updateOne({ size: shertSize })
					}
					break;
				}
			}
		})
		res.status(200).json({
			success: true,
			user,
		});
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
		res.status(200).json({
			success: true,
			data
		});
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
		user?.updateOne({
			helthIsueId: helth._id.toString()
		});
		user?.nongCampIds.forEach(async (nongCampId: string) => {
			const nongCamp = await NongCamp.findById(nongCampId);

			const camp = await Camp.findById(nongCamp?.campId);

			if (!camp?.dataLock) {
				const baan = await Baan.findById(nongCamp?.baanId);
				const baanNewHelth = swop(oldHelthId as string, helth._id.toString(), baan?.nongHelthIsueIds as string[]);
				const campNewHelth = swop(oldHelthId as string, helth._id.toString(), camp?.nongHelthIsueIds as string[]);
				camp?.updateOne({
					nongHelthIsueIds: campNewHelth
				});
				baan?.updateOne({
					nongHelthIsueIds: baanNewHelth
				});
			}
		});
		user?.peeCampIds.forEach(async (peeCampId) => {
			const peeCamp = await PeeCamp.findById(peeCampId)

			const camp = await Camp.findById(peeCamp?.campId)

			if (!camp?.dataLock) {
				const baan = await Baan.findById(peeCamp?.baanId)
				const part = await Part.findById(peeCamp?.partId)

				const baanNewHelth = swop(oldHelthId as string, helth._id.toString(), baan?.peeHelthIsueIds as string[])
				const partNewHelth = swop(oldHelthId as string, helth._id.toString(), part?.peeHelthIsueIds as string[])
				const campNewHelth = swop(oldHelthId as string, helth._id.toString(), camp?.peeHelthIsueIds as string[])
				baan?.updateOne({
					peeHelthIsueIds: baanNewHelth
				})
				part?.updateOne({
					peeHelthIsueIds: partNewHelth
				})
				camp?.updateOne({
					peeHelthIsueIds: campNewHelth
				})
			}
		})
		user?.petoCampIds.forEach(async (petoCampId) => {
			const petoCamp = await PeeCamp.findById(petoCampId)

			const camp = await Camp.findById(petoCamp?.campId)

			if (!camp?.dataLock) {
				const part = await Part.findById(petoCamp?.partId)

				const partNewHelth = swop(oldHelthId as string, helth._id.toString(), part?.petoHelthIsueIds as string[])
				const campNewHelth = swop(oldHelthId as string, helth._id.toString(), camp?.petoHelthIsueIds as string[])
				camp?.updateOne({
					petoHelthIsueIds: campNewHelth
				})
				part?.updateOne({
					petoHelthIsueIds: partNewHelth
				})
			}
		})
		res.status(200).json({
			success: true,
			data: helth
		});
	} else {
		const helth = await HelthIsue.findByIdAndUpdate(user?.helthIsueId, req.body);
		res.status(200).json({
			success: true,
			data: helth
		});
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
			const oldc = camp?.nongHaveBottle;
			camp?.updateOne({
				nongHaveBottle: oldc as number + change
			});

			const oldb = baan?.nongHaveBottle;
			baan?.updateOne({
				nongHaveBottle: oldb as number + change
			});
		}
	});
	user?.peeCampIds.forEach(async (peeCampId) => {
		const peeCamp = await PeeCamp.findById(peeCampId);

		const camp = await Camp.findById(peeCamp?.campId);

		if (!camp?.dataLock) {
			const baan = await Baan.findById(peeCamp?.baanId);
			const part = await Part.findById(peeCamp?.partId);
			const oldc = camp?.peeHaveBottle
			camp?.updateOne({
				peeHaveBottle: oldc as number + change
			})

			const oldb = baan?.peeHaveBottle
			baan?.updateOne({
				peeHaveBottle: oldb as number + change
			})
			const oldp = part?.peeHaveBottle
			part?.updateOne({
				peeHaveBottle: oldp as number + change
			})
		}
	});
	user?.petoCampIds.forEach(async (petoCampId) => {
		const petoCamp = await PetoCamp.findById(petoCampId);

		const camp = await Camp.findById(petoCamp?.campId);

		if (!camp?.dataLock) {
			const part = await Part.findById(petoCamp?.partId);
			const oldc = camp?.petoHaveBottle
			camp?.updateOne({
				petoHaveBottle: oldc as number + change
			})
			const oldp = part?.petoHaveBottle
			part?.updateOne({
				petoHaveBottle: oldp as number + change
			})
		}
	});
	res.status(200).json({
		success: true,
		user,
	});
}
