import bcrypt from 'bcrypt'

const hashPassword = password => {

    return bcrypt.hashSync(password, 10);

}

const checkPassword = (password, hash) => {

    return bcrypt.compareSync(password, hash);

}

export { hashPassword, checkPassword }