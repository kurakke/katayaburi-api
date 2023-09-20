import { describe, expect, it } from "vitest";
import { Room } from "./room";
import { log } from "console";
import exp from "constants";

describe('パスフレーズ', () => {
    it('パスフレーズが設定できるか', () => {
        const room = new Room('kurakke')

        expect(room.passphrase).toBe('kurakke')
    })
})

describe('メンバー', () => {
    it('メンバーが追加出来るか', () => {
        // arrange
        const room = new Room('kurakke')
        // act
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })

        // assertion
        expect(room.members).toStrictEqual(
            [{
                id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
                nickname: 'kurakke',
            }]
        )
    })

    it('メンバーの削除', () => {
        // arrange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        // act
        room.removeMember('1368D39B-8EE8-4051-95B7-F52CF91B7B1D')

        // assertion
        expect(room.members).toHaveLength(0)
    })

    it('メンバーの数を取得', () => {
        // arange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })

        // act
        const memberCount = room.memberCount();

        // assertion
        expect(memberCount).toBe(2)
    })
})

describe('ゲームのテスト', () => {
    it('canStartGameがokになる時のテスト', () => {
        // arange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })
        room.addMember({
            id: '9113B610-929A-4E95-B1B7-CABCE7018086',
            nickname: 'kurakkekurakke',
        })
        // act
        const isCanGameStart = room.canStartGame()

        // assertion
        expect(isCanGameStart).toBe(true)
    })

    it('canStartGameがfalseになる時のテスト', () => {
        // arange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })
        // act
        const isCanGameStart = room.canStartGame()

        // assertion
        expect(isCanGameStart).toBe(false)
    })

    it('startGameでゲームがスタートできる場合', () => {
        // arrange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })
        room.addMember({
            id: '9113B610-929A-4E95-B1B7-CABCE7018086',
            nickname: 'kurakkekurakke',
        })
        // act
        const startGame = room.startGame('1368D39B-8EE8-4051-95B7-F52CF91B7B1D')

        // assertion
        expect(startGame).toBe(true)
    })

    it('startGameでゲーム開始のための人数が足りない場合', () => {
        // arrange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })
        // act
        const startGame = room.startGame('1368D39B-8EE8-4051-95B7-F52CF91B7B1D')

        // assertion
        expect(startGame).toBe(false)
    })

    it('startGameでゲームが既にゲームが始まっている場合')
        // arrange
        const room = new Room('kurakke')
        room.addMember({
            id: '1368D39B-8EE8-4051-95B7-F52CF91B7B1D',
            nickname: 'kurakke',
        })
        room.addMember({
            id: '41287D2B-C73E-4A6A-B79E-D43C2A32C7D4',
            nickname: 'kurakkekurakke',
        })
        // act
        const startGame = room.startGame('1368D39B-8EE8-4051-95B7-F52CF91B7B1D')

        expect(startGame).toBe(false)
})
