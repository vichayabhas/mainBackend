import { getUser } from "../middleware/auth";
import Camp from "../models/Camp"
import Song from "../models/Song"
import User from "../models/User"
import { NextFunction } from 'express'
import express from "express";

export async function addLikeSong(req: express.Request, res: express.Response, next: NextFunction) {
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
export async function getNongLikeSong(req: express.Request, res: express.Response, next: NextFunction) {
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
export async function getPeeLikeSong(req: express.Request, res: express.Response, next: NextFunction) {
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
export async function getPetoLikeSong(req: express.Request, res: express.Response, next: NextFunction) {
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
export async function getAllCampLikeSong(req: express.Request, res: express.Response, next: NextFunction) {
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