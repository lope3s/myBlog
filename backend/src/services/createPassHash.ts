import { createHmac } from 'crypto';

const createPassHash = (pass: string) => {
    if (pass) {
        return createHmac('sha256', String(process.env.HASH_DATA)).update(pass).digest("hex")
    }

    return ''
}

export default createPassHash