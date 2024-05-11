import { getUser } from "../middleware/auth";
import Baan from "../models/Baan";
import Camp from "../models/Camp"
import Song from "../models/Song"
import User from "../models/User"
import express from "express";
import { resError, resOk, swop } from "./setup";
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
        if (!user || !song) {
            return
        }
        song.userLikeIds.push(user._id.toString())
        user.likeSongIds.push(songId)
    })
    res.status(200).json({
        success: true
    })
}
async function getAllSong() {
    const songs = await Song.find()
    const map: Map<string, number> = new Map
    songs.forEach((song) => {
        map.set(song._id.toString(), 0)
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
            song.baanIds.push(baan.id)
            baan.songIds.push(song.id)
        }
    })
    res.status(200).json({ success: true })
}
export async function removeBaanSong(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { baanId, songId } = req.body
    const baan = await Baan.findById(baanId)
    const song = await Song.findById(songId)
    if (!baan || !song) {
        return res.status(400).json(resError)
    }
    baan.updateOne({ songIds: swop(song.id, null, baan.songIds) })
    song.updateOne({ baanIds: swop(baan.id, null, song.baanIds) })
    res.status(200).json(resOk)
}


