const Baan = require("../models/Baan");
const Camp = require("../models/Camp");
const HelthIsue = require("../models/HelthIsue");
const NongCamp = require("../models/NongCamp");
const Part = require("../models/Part");
const PeeCamp = require("../models/PeeCamp");
const PetoCamp = require("../models/PetoCamp");
const User = require("../models/User");
const {
	swop
} = require("./setup");
// exports.register             
// exports.login
// exports.getMe               protect
// exports.logout
// exports.getUser             protect lib
// exports.updateMode          protect pee up
// exports.updateSize          protect
// exports.getHelthIsue        protect
// exports.updateHelth         protect
// exports.updateBottle        protect
exports.register = async (req, res) => {
	try {
		const user = await User.create(req.body);
		sendTokenResponse(user, 200, res);
	} catch (err) {
		res.status(400).json({
			success: false
		});
		console.log(err.stack);
	}
};
exports.login = async (req, res) => {
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
	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return res.status(401).json({
			success: false,
			msg: "Invalid credentials"
		});
	}
	sendTokenResponse(user, 200, res);
};
const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === "production") {
		options.secure = true;
	}
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});
};
exports.getMe = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).json({
		success: true,
		data: user
	});
};
exports.logout = async (req, res) => {
	//Clears cookie
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});
	res.status(200).json({
		success: true,
		data: {}
	});
};
exports.getUser = async (req) => {
	const token = req.header.authorization.sprit(' ')[1];
	const decoded = jwt.verify(token.process.env.JWT_SECRET);
	return await User.findById(decoded.id);
}
exports.updateMode = async (req, res) => {
	const {
		mode,
		filter
	} = req.body;
	const user = await User.findByIdAndUpdate((await this.getUser(req))._id, {
		mode,
		filter
	});
	res.status(200).json({
		success: true,
		user,
	});
};
exports.updateSize = async (req, res) => {
	const {
		shertSize
	} = req.body;
	const old = await this.getUser(req)
	const oldSize = old.shertSize;
	if (shertSize) {
		const user = await User.findByIdAndUpdate(old._id, {
			shertSize
		});
		user.nongCampIds.forEach(async (nongcampId) => {
			const nongCamp = await NongCamp.findById(nongcampId);
			const camp = await Camp.findById(nongCamp.campId);
			if (!camp.dataLock) {
				const baan = await Baan.findById(nongCamp.baanId);
				const oldc = camp.nongShertSize.get(oldSize);
				camp.nongShertSize.set(oldSize, oldc - 1);
				const newc = camp.nongShertSize.get(user.shertSize);
				camp.nongShertSize.set(user.shertSize, newc + 1);
				const oldb = baan.nongShertSize.get(oldSize);
				baan.nongShertSize.set(oldSize, oldb - 1);
				const newb = baan.nongShertSize.get(user.shertSize);
				baan.nongShertSize.set(user.shertSize, newb + 1);
			}
		});
		user.peeCampIds.forEach(async (peeCampId) => {
			const peeCamp = await PeeCamp.findById(peeCampId);
			const camp = await Camp.findById(peeCamp.campId);
			if (!camp.dataLock) {
				const baan = await Baan.findById(peeCamp.baanId);
				const part = await Part.findById(peeCamp.partId);
				const oldc = camp.peeShertSize.get(oldSize);
				camp.peeShertSize.set(oldSize, oldc - 1);
				const newc = camp.peeShertSize.get(user.shertSize);
				camp.peeShertSize.set(user.shertSize, newc + 1);
				const oldb = baan.peeShertSize.get(oldSize);
				baan.peeShertSize.set(oldSize, oldb - 1);
				const newb = baan.peeShertSize.get(user.shertSize);
				baan.peeShertSize.set(user.shertSize, newb + 1);
				const oldp = part.peeShertSize.get(oldSize);
				part.peeShertSize.set(oldSize, oldp - 1);
				const newp = part.peeShertSize.get(user.shertSize);
				part.peeShertSize.set(user.shertSize, newp + 1);
			}
		});
		user.petoCampIds.forEach(async (petoCampId) => {
			const petoCamp = await PetoCamp.findById(petoCampId);
			const camp = await Camp.findById(petoCamp.campId);
			if (!camp.dataLock) {
				const part = await Part.findById(petoCamp.partId);
				const oldc = camp.petoShertSize.get(oldSize);
				camp.petoShertSize.set(oldSize, oldc - 1);
				const newc = camp.petoShertSize.get(user.shertSize);
				camp.petoShertSize.set(user.shertSize, newc + 1);
				const oldp = part.petoShertSize.get(oldSize);
				part.petoShertSize.set(oldSize, oldp - 1);
				const newp = part.petoShertSize.get(user.shertSize);
				part.petoShertSize.set(user.shertSize, newp + 1);
			}
		});
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
exports.getHelthIsue = async (req, res) => {
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
};
exports.updateHelth = async (req, res) => {
	//req.params.id=userId
	const user = await this.getUser(req)
	const oldHelthId = user.helthIsueId
	if (findLock(user._id, oldHelthId)) {
		const helth = await HelthIsue.create(req.body);
		user.updateOne({
			helthIsueId: helth._id
		});
		user.nongCampIds.forEach(async (nongCampId) => {
			const nongCamp = await NongCamp.findById(nongCampId);
			const camp = await Camp.findById(nongCamp.campId);
			if (!camp.dataLock) {
				const baan = await Baan.findById(nongCamp.baanId);
				const baanNewHelth = swop(oldHelthId, helth._id, baan.nongHelthIsueIds);
				const campNewHelth = swop(oldHelthId, helth._id, camp.nongHelthIsueIds);
				camp.updateOne({
					nongHelthIsueIds: campNewHelth
				});
				baan.updateOne({
					nongHelthIsueIds: baanNewHelth
				});
			}
		});
		user.peeCampIds.forEach(async (peeCampId) => {
			const peeCamp = await PeeCamp.findById(peeCampId)
			const camp = await Camp.findById(peeCamp.campId)
			if (!camp.dataLock) {
				const baan = await Baan.findById(peeCamp.baanId)
				const part = await Part.findById(peeCamp.partId)
				const baanNewHelth = swop(oldHelthId, helth._id, baan.peeHelthIsueIds)
				const partNewHelth = swop(oldHelthId, helth._id, part.peeHelthIsueIds)
				const campNewHelth = swop(oldHelthId, helth._id, camp.peeHelthIsueIds)
				baan.updateOne({
					peeHelthIsueIds: baanNewHelth
				})
				part.updateOne({
					peeHelthIsueIds: partNewHelth
				})
				camp.updateOne({
					peeHelthIsueIds: campNewHelth
				})
			}
		})
		user.petoCampIds.forEach(async (petoCampId) => {
			const petoCamp = await PeeCamp.findById(petoCampId)
			const camp = await Camp.findById(petoCamp.campId)
			if (!camp.dataLock) {
				const part = await Part.findById(petoCamp.partId)
				const partNewHelth = swop(oldHelthId, helth._id, part.petoHelthIsueIds)
				const campNewHelth = swop(oldHelthId, helth._id, camp.petoHelthIsueIds)
				camp.updateOne({
					petoHelthIsueIds: campNewHelth
				})
				part.updateOne({
					petoHelthIsueIds: partNewHelth
				})
			}
		})
		res.status(200).json({
			success: true,
			data: helth
		});
	} else {
		const helth = await HelthIsue.findByIdAndUpdate(user.helthIsueId, req.body);
		res.status(200).json({
			success: true,
			data: helth
		});
	}
};
async function findLock(userId, oldHelthId) {
	if (!oldHelthId) {
		return true
	}
	const user = await User.findById(userId);
	user.nongCampIds.forEach(async (nongCampId) => {
		const nongCamp = await NongCamp.findById(nongCampId);
		const camp = await Camp.findById(nongCamp.campId);
		if (camp.nongHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true;
		}
	});
	user.peeCampIds.forEach(async (peeCampId) => {
		const peeCamp = await PeeCamp.findById(peeCampId);
		const camp = await Camp.findById(peeCamp.campId);
		if (camp.peeHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true;
		}
	});
	user.petoCampIds.forEach(async (petoCampId) => {
		const petoCamp = await PetoCamp.findById(petoCampId);
		const camp = await Camp.findById(petoCamp.campId);
		if (camp.petoHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
			return true;
		}
	});
	return false;
}
exports.updateBottle = async (req, res) => {
	const old = await this.getUser(req)
	const oldBottle = old.haveBottle
	var change = 1
	if (oldBottle) {
		change = -1
	}
	const user = await User.findByIdAndUpdate(old._id, {
		haveBottle: !oldBottle
	});
	user.nongCampIds.forEach(async (nongcampId) => {
		const nongCamp = await NongCamp.findById(nongcampId);
		const camp = await Camp.findById(nongCamp.campId);
		if (!camp.dataLock) {
			const baan = await Baan.findById(nongCamp.baanId);
			const oldc = camp.nongHaveBottle;
			camp.updateOne({
				nongHaveBottle: oldc + change
			});
			const oldb = baan.nongHaveBottle;
			baan.updateOne({
				nongHaveBottle: oldb + change
			});
		}
	});
	user.peeCampIds.forEach(async (peeCampId) => {
		const peeCamp = await PeeCamp.findById(peeCampId);
		const camp = await Camp.findById(peeCamp.campId);
		if (!camp.dataLock) {
			const baan = await Baan.findById(peeCamp.baanId);
			const part = await Part.findById(peeCamp.partId);
			const oldc = camp.peeHaveBottle
			camp.updateOne({
				peeHaveBottle: oldc + change
			})
			const oldb = baan.peeHaveBottle
			baan.updateOne({
				peeHaveBottle: oldb + change
			})
			const oldp = part.peeHaveBottle
			part.updateOne({
				peeHaveBottle: oldp + change
			})
		}
	});
	user.petoCampIds.forEach(async (petoCampId) => {
		const petoCamp = await PetoCamp.findById(petoCampId);
		const camp = await Camp.findById(petoCamp.campId);
		if (!camp.dataLock) {
			const part = await Part.findById(petoCamp.partId);
			const oldc = camp.petoHaveBottle
			camp.updateOne({
				petoHaveBottle: oldc + change
			})
			const oldp = part.petoHaveBottle
			part.updateOne({
				petoHaveBottle: oldp + change
			})
		}
	});
	res.status(200).json({
		success: true,
		user,
	});
}
