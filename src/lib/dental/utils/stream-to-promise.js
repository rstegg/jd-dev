import { once } from 'ramda'

export default stream =>
  new Promise( ( resolve, reject ) => {
    const resolveOnce = once(resolve)
    stream.on('finish', data => resolveOnce(stream))
    stream.on('end', data => resolveOnce(stream))
    stream.on('data', data => { stream.body.data += data.toString().trim() })
    stream.on('error', reject)
  } )
