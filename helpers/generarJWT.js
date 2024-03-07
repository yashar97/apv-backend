import jwt from 'jsonwebtoken'

const generarJWT = id => {

    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });

}

const verificarJWT = token => {

    return jwt.verify(token, process.env.SECRET_KEY);

}

export { generarJWT, verificarJWT }