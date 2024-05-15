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
import { InterLostAndFound } from "../models/intreface";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
// export async function addLikeSong
// export async function getNongLikeSong
// export async function getPeeLikeSong
// export async function getPetoLikeSong
// export async function getAllCampLikeSong
// export async function addBaanSong
// export async function removeSong
export async function addLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { songIds } = req.body
    const user = await getUser(req)
    songIds.forEach(async (songId: string) => {
        const song = await Song.findById(songId)
        await song?.updateOne({userLikeIds:swop(null,user?.id,song.userLikeIds)})
        user?.likeSongIds.push(song?.id)
    })
    await user?.updateOne({likeSongIds:user.likeSongIds})
    res.status(200).json({
        success: true
    })
}
async function getAllSong() {
    const songs = await Song.find()
    const map: Map<string, number> = new Map
    songs.forEach((song) => {
        map.set(song.id, 0)
    })
    return map
}
export async function getNongLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    const songList: Map<string, number> = await getAllSong()
    camp?.nongIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong?.likeSongIds.forEach((songId: string) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    res.status(200).json({ songList })
}
export async function getPeeLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()

    camp?.peeIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)

        nong?.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    res.status(200).json({ songList })
}
export async function getPetoLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()

    camp?.petoIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)

        nong?.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    res.status(200).json({ songList })
}
export async function getAllCampLikeSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()

    camp?.petoIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)

        nong?.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    camp?.peeIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)

        nong?.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    camp?.nongIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong?.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) as number + 1)
        })
    })
    res.status(200).json({ songList })
}
export async function addBaanSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { baanId, songIds } = req.body
    const baan = await Baan.findById(baanId)
    if (!baan) {
        return res.status(400).json({ success: false })
    }
    const buf: string[] = songIds
    buf.forEach(async (songId) => {
        const song = await Song.findById(songId)
        if (song) {
            baan.songIds.push(song.id)
            await song.updateOne({baanIds:swop(null,baan.id,song.baanIds)})
        }
    })
    await baan.updateOne({songIds:baan.songIds})
    res.status(200).json({ success: true })
}
export async function removeBaanSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { baanId, songId } = req.body
    const baan = await Baan.findById(baanId)
    const song = await Song.findById(songId)
    if (!baan || !song) {
        return res.status(400).json(resError)
    }
    await baan.updateOne({ songIds: swop(song.id, null, baan.songIds) })
    await song.updateOne({ baanIds: swop(baan.id, null, song.baanIds) })
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
    const place = await Place.findById(placeId)
    const lostAndFound = await LostAndFound.create({ campId, type, name, detail, userId: user?.id, placeId, buildingId: place?.buildingId })
    user?.lostAndFoundIds.push(lostAndFound.id)
    if (campId) {
        const camp = await Camp.findById(campId)
        await camp?.updateOne({lostAndFoundIds:swop(null,lostAndFound.id,camp.lostAndFoundIds)})
    }
    await place?.updateOne({lostAndFoundIds:swop(null,lostAndFound.id,place.lostAndFoundIds)})
    const building = await Building.findById(place?.buildingId)
    building?.lostAndFoundIds.push(lostAndFound.id)
    await building?.updateOne({lostAndFoundIds:swop(null,lostAndFound.id,building.lostAndFoundIds)})
    res.status(201).json(lostAndFound)
}
export async function deleteLostAndFound(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const lostAndFound = await LostAndFound.findById(req.params.id)
    const camp = await Camp.findById(lostAndFound?.campId)
    if (user?.role != 'admin' && (lostAndFound?.userId?.localeCompare(user?.id)) && (camp ? !user?.authorizeIds.includes(camp.id) : true) && !camp?.boardIds.includes(user?.id)) {
        res.status(403).json(resError)
    }
    const owner = await User.findById(lostAndFound?.userId)
    const place = await Place.findById(lostAndFound?.placeId)
    const building = await Building.findById(lostAndFound?.buildingId)
    await owner?.updateOne({ lostAndFoundIds: swop(lostAndFound?.id, null, owner.lostAndFoundIds) })
    await place?.updateOne({ lostAndFoundIds: swop(lostAndFound?.id, null, place.lostAndFoundIds) })
    await building?.updateOne({ lostAndFoundIds: swop(lostAndFound?.id, null, building.lostAndFoundIds) })
    if (camp) {
        camp.updateOne({ lostAndFoundIds: swop(lostAndFound?.id, null, camp.lostAndFoundIds) })
    }
    await lostAndFound?.deleteOne()
    sendRes(res, true)
}
export async function getLostAndFounds(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    var out: InterLostAndFound[] = []
    user?.nongCampIds.forEach(async (nongCampId: string) => {
        const nongCamp = await NongCamp.findById(nongCampId)
        const camp = await Camp.findById(nongCamp?.campId)
        camp?.lostAndFoundIds.forEach(async (id) => {
            const lostAndFound: InterLostAndFound | null = await LostAndFound.findById(id)
            if (lostAndFound) {
                out.push(lostAndFound)
            }
        })
    })
    if (user?.role != 'nong') {
        user?.peeCampIds.forEach(async (peeCampId) => {
            const peeCamp = await PeeCamp.findById(peeCampId)
            const camp = await Camp.findById(peeCamp?.campId)
            camp?.lostAndFoundIds.forEach(async (id) => {
                const lostAndFound: InterLostAndFound | null = await LostAndFound.findById(id)
                if (lostAndFound) {
                    out.push(lostAndFound)
                }
            })
        })
        user?.petoCampIds.forEach(async (petoCampId) => {
            const petoCamp = await PetoCamp.findById(petoCampId)
            const camp = await Camp.findById(petoCamp?.campId)
            camp?.lostAndFoundIds.forEach(async (id) => {
                const lostAndFound: InterLostAndFound | null = await LostAndFound.findById(id)
                if (lostAndFound) {
                    out.push(lostAndFound)
                }
            })
        })
        const lostAndFounds: InterLostAndFound[] = await LostAndFound.find({ campId: null })
        lostAndFounds.forEach((lostAndFound) => {
            out.push(lostAndFound)
        })
    }
    res.status(200).json(out)
}
export async function getLostAndFound(req: express.Request, res: express.Response, next: express.NextFunction) {
    const lostAndFound=await LostAndFound.findById(req.params.id)
    res.status(200).json(lostAndFound)
}