import { getUser } from "../middleware/auth";
import Baan from "../models/Baan";
import Camp from "../models/Camp"
import Song from "../models/Song"
import User from "../models/User"
import express from "express";
import { resError, resOk, sendRes, swop } from "./setup";
import LostAndFound from "../models/LostAndFound";
import Building from "../models/Building";
import Place from "../models/Place";
import NongCamp from "../models/NongCamp";
import { InterCampBack, InterLostAndFound, InterPlace, ShowLostAndFound } from "../models/intreface";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
import mongoose from "mongoose";
// export async function addLikeSong
// export async function getNongLikeSong
// export async function getPeeLikeSong
// export async function getPetoLikeSong
// export async function getAllCampLikeSong
// export async function addBaanSong
// export async function removeBaanSong
// export async function addLostAndFound
// export async function deleteLostAndFound
// export async function getLostAndFounds
// export async function getLostAndFound
export async function addLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { songIds }: { songIds: string[] } = req.body
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < songIds.length) {
        const song = await Song.findById(songIds[i++])
        if (!song) {
            continue
        }
        await song.updateOne({ userLikeIds: swop(null, user._id, song.userLikeIds) })
        user.likeSongIds.push(song?._id)
    }
    await user.updateOne({ likeSongIds: user.likeSongIds })
    res.status(200).json({
        success: true
    })
}
async function getAllSong() {
    const songs = await Song.find()
    const map: Map<mongoose.Types.ObjectId, number> = new Map
    var i = 0
    while (i < songs.length) {
        map.set(songs[i++]._id, 0)
    }
    return map
}
export async function getNongLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const songList: Map<mongoose.Types.ObjectId, number> = await getAllSong()
    var i = 0
    while (i < camp.nongIds.length) {
        const user = await User.findById(camp.nongIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    res.status(200).json({ songList })
}
export async function getPeeLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const songList: Map<mongoose.Types.ObjectId, number> = await getAllSong()
    var i = 0
    while (i < camp.peeIds.length) {
        const user = await User.findById(camp.peeIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    res.status(200).json({ songList })
}
export async function getPetoLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const songList: Map<mongoose.Types.ObjectId, number> = await getAllSong()
    var i = 0
    while (i < camp.petoIds.length) {
        const user = await User.findById(camp.petoIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    res.status(200).json({ songList })
}
export async function getAllCampLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const songList: Map<mongoose.Types.ObjectId, number> = await getAllSong()
    var i = 0
    while (i < camp.nongIds.length) {
        const user = await User.findById(camp.nongIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    while (i < camp.peeIds.length) {
        const user = await User.findById(camp.peeIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    while (i < camp.petoIds.length) {
        const user = await User.findById(camp.petoIds[i++])
        if (!user) {
            continue
        }
        var j = 0
        while (j < user.likeSongIds.length) {
            const songId = user.likeSongIds[j++]
            songList.set(songId, songList.get(songId) as number + 1)
        }
    }
    res.status(200).json({ songList })
}
export async function addBaanSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { baanId, songIds }: { baanId: string, songIds: string[] } = req.body
    const baan = await Baan.findById(baanId)
    if (!baan) {
        return res.status(400).json({ success: false })
    }
    var i = 0
    while (i < songIds.length) {
        const song = await Song.findById(songIds[i++])
        if (song) {
            baan.songIds.push(song._id)
            await song.updateOne({ baanIds: swop(null, baan._id, song.baanIds) })
        }
    }
    await baan.updateOne({ songIds: baan.songIds })
    res.status(200).json({ success: true })
}
export async function removeBaanSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { baanId, songId } = req.body
    const baan = await Baan.findById(baanId)
    const song = await Song.findById(songId)
    if (!baan || !song) {
        return res.status(400).json(resError)
    }
    await baan.updateOne({ songIds: swop(song._id, null, baan.songIds) })
    await song.updateOne({ baanIds: swop(baan._id, null, song.baanIds) })
    res.status(200).json(resOk)
}
export async function addLostAndFound(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {
        campId,
        type,
        name,
        detail,
        placeId,
    } = req.body
    const user = await getUser(req)
    const buildingId = placeId ? (await Place.findById(placeId))?.buildingId : null
    const place  =placeId? await Place.findById(placeId):null
    if (!user) {
        sendRes(res, false)
        return
    }
    const lostAndFound = await LostAndFound.create({ campId, type, name, detail, userId: user._id, placeId, buildingId })
    await user.updateOne({ lostAndFoundIds: swop(null, lostAndFound._id, user.lostAndFoundIds) })
    if (campId) {
        const camp = await Camp.findById(campId)
        await camp?.updateOne({ lostAndFoundIds: swop(null, lostAndFound._id, camp.lostAndFoundIds) })
    }
    if (place) {
        await place.updateOne({ lostAndFoundIds: swop(null, lostAndFound._id, place.lostAndFoundIds) })
        const building = await Building.findById(place.buildingId)
        await building?.updateOne({ lostAndFoundIds: swop(null, lostAndFound._id, building.lostAndFoundIds) })
    }

    res.status(201).json({})
}
export async function deleteLostAndFound(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const lostAndFound = await LostAndFound.findById(req.params.id)
    if (!lostAndFound || !user) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(lostAndFound.campId)
    if (!user || (user.role != 'admin' && (lostAndFound.userId !== (user._id)) && (camp ? !user.authPartIds.includes(camp.partBoardId as mongoose.Types.ObjectId) && !user.authPartIds.includes(camp.partRegiterId as mongoose.Types.ObjectId) : true) && !camp?.boardIds.includes(user._id))) {
        res.status(403).json(resError)
    }
    const owner = await User.findById(lostAndFound.userId)
    const place = await Place.findById(lostAndFound.placeId)
    const building = await Building.findById(lostAndFound?.buildingId)
    await owner?.updateOne({ lostAndFoundIds: swop(lostAndFound._id, null, owner.lostAndFoundIds) })
    await place?.updateOne({ lostAndFoundIds: swop(lostAndFound._id, null, place.lostAndFoundIds) })
    await building?.updateOne({ lostAndFoundIds: swop(lostAndFound._id, null, building.lostAndFoundIds) })
    if (camp) {
        camp.updateOne({ lostAndFoundIds: swop(lostAndFound._id, null, camp.lostAndFoundIds) })
    }
    await lostAndFound.deleteOne()
    sendRes(res, true)
}
export async function getLostAndFounds(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    var out: InterLostAndFound[] = []
    var i = 0
    if (user.fridayActEn) {
        out = await LostAndFound.find()
    } else {
        while (i < user.nongCampIds.length) {
            const nongCamp = await NongCamp.findById(user.nongCampIds[i++])
            if (!nongCamp) {
                continue
            }
            const camp = await Camp.findById(nongCamp.campId)
            if (!camp) {
                continue
            }
            var j = 0
            while (j < camp.lostAndFoundIds.length) {
                const lostAndFound: InterLostAndFound | null = await LostAndFound.findById(camp.lostAndFoundIds[j++])
                if (lostAndFound) {
                    out.push(lostAndFound)
                }
            }
        }
    }
    i = 0
    var output: ShowLostAndFound[] = []
    while (i < out.length) {
        const buf = await fillLostAndFound(out[i++])
        if (buf) {
            output.push(buf)
        }
    }
    res.status(200).json(output)
}
export async function getLostAndFound(req: express.Request, res: express.Response, next: express.NextFunction) {
    const lostAndFound = await LostAndFound.findById(req.params.id)
    if (!lostAndFound) {
        sendRes(res, false)
        return
    }
    const buf = await fillLostAndFound(lostAndFound.toObject())
    res.status(200).json(buf)
}
export async function getAllBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const buildings = await Building.find()
    res.status(200).json(buildings)
}
export async function createPlace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { room, buildingId, flore } = req.body
    const place = await Place.create({ room, buildingId, flore })
    const building = await Building.findById(buildingId)
    await building?.updateOne({ placeIds: swop(null, place._id, building.placeIds) })
    res.status(201).json(place)
}
export async function saveDeletePlace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const place = await Place.findById(req.params.id)
    if (place?.actionPlanIds.length || place?.boySleepBaanIds.length || place?.girlSleepBaanIds.length || place?.normalBaanIds.length || place?.fridayActIds.length || place?.partIds.length || place?.lostAndFoundIds.length) {
        return res.status(400).json({ success: false })
    }
    await place?.deleteOne()
    res.status(200).json({ success: true })
}
export async function createBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.create({ name: req.params.id })
    res.status(201).json(building)
}
export async function saveDeleteBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.findById(req.params.id)
    if (building?.placeIds.length) {
        return res.status(400).json({ success: false })
    }
    await building?.deleteOne()
    sendRes(res, true)
}
export async function getPlaces(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.findById(req.params.id)
    if (!building) {
        sendRes(res, false)
        return
    }
    var places: InterPlace[] = []
    var i = 0
    while (i < building.placeIds.length) {
        const place = await Place.findById(building.placeIds[i++])
        if (place) {
            places.push(place.toObject())
        }
    }
    res.status(200).json(places)
}
export async function getPlace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const place = await Place.findById(req.params.id)
    res.status(200).json(place)
}
export async function getBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.findById(req.params.id)
    res.status(200).json(building)
}
async function fillLostAndFound(input: InterLostAndFound): Promise<ShowLostAndFound | null> {
    const {
        _id,
        name,
        buildingId,
        placeId,
        userId,
        detail,
        campId,
        type


    } = input
    const user = await User.findById(userId)
    const building = await Building.findById(buildingId)
    const place = await Place.findById(placeId)
    const camp = await Camp.findById(campId)
    if (!user) {
        return null
    }
    return {
        _id,
        name,
        buildingId,
        placeId,
        detail,
        userId,
        userLastName: user.lastname,
        userName: user.name,
        userNickname: user.nickname,
        tel: user.tel,
        room: place ? place.room : 'null',
        floor: place ? place.flore : 'null',
        buildingName: building ? building.name : 'null',
        campId,
        type,
        campName: camp ? camp.campName : 'null'
    }
}