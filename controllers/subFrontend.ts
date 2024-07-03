import express from "express";
import { Group } from "../models/intreface";
import { getUser } from "../middleware/auth";
import { sendRes } from "./setup";
export async function peeBypass(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { studentId, group }: { studentId: string, group: Group } = req.body
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    const last = user.email.split('@')[1]
    if (last.localeCompare('student.chula.ac.th')) {
        sendRes(res, false)
        return
    }
    await user.updateOne({
        studentId,
        group,
        fridayActEn: true,
        role: 'pee',
        mode: 'pee'
    })
    sendRes(res, true)
}
export async function petoBypass(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { studentId, group }: { studentId: string, group: Group } = req.body
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    const last = user.email.split('@')[1]
    if (last.localeCompare('student.chula.ac.th')) {
        sendRes(res, false)
        return
    }
    await user.updateOne({
        studentId,
        group,
        fridayActEn: true,
        role: 'peto',
        mode: 'pee'
    })
    sendRes(res, true)
}
export async function nongBypass(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { studentId }: { studentId: string } = req.body
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    const last = user.email.split('@')[1]
    if (last.localeCompare('student.chula.ac.th')) {
        sendRes(res, false)
        return
    }
    await user.updateOne({
        studentId,
        fridayActEn: true,
    })
    sendRes(res, true)
}
export async function adminBypass(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { studentId, group }: { studentId: string, group: Group } = req.body
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }
    const last = user.email.split('@')[1]
    if (last.localeCompare('student.chula.ac.th')) {
        sendRes(res, false)
        return
    }
    await user.updateOne({
        studentId,
        group,
        fridayActEn: true,
        role: 'admin',
        mode: 'pee'
    })
    sendRes(res, true)
}