const Camp = require("../models/Camp")
const Song = require("../models/Song")
const User = require("../models/User")

exports.addLikeSong = async (req, res, next) => {
    const songIds = req.params.id
    const user = await getUser(req)
    songIds.forEach(async (songId) => {
        const song = await Song.findById(songId)
        song.userLikeIds.push(user._id)
        user.likeSongIds.push(songId)
    })
    res.status(200).json({
        success: true
    })
}
async function getAllSong() {
    const songs = await Song.find()
    const map = new Map
    songs.forEach((song) => {
        map.set(song._id, 0)
    })
    return map
}
exports.getNongLikeSong = async (req, res, next) => {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()
    camp.nongIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    res.status(200).json({ songList })
}
exports.getPeeLikeSong = async (req, res, next) => {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()
    camp.peeIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    res.status(200).json({ songList })
}
exports.getPetoLikeSong = async (req, res, next) => {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()
    camp.petoIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    res.status(200).json({ songList })
}
exports.getAllCampLikeSong = async (req, res, next) => {
    const camp = await Camp.findById(req.params.id)
    const songList = await getAllSong()
    camp.petoIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    camp.peeIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    camp.nongIds.forEach(async (nongId) => {
        const nong = await User.findById(nongId)
        nong.likeSongIds.forEach((songId) => {
            songList.set(songId, songList.get(songId) + 1)
        })
    })
    res.status(200).json({ songList })
}