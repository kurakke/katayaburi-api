import { describe, expect, it } from "vitest";
import { Room } from "./room";

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
