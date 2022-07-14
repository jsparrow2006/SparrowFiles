export default interface IDrive {
    name: string,
    total: string,
    used: string,
    description: string
    mount_point: string,
    type: 'HDD' | 'FLASH'
}
