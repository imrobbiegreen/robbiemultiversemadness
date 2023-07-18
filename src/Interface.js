import { useKeyboardControls } from '@react-three/drei'
import useGame from './stores/useGame.js'
import { useState, useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'

export default function Interface()
{
    const time = useRef()

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const keyboardForward = useKeyboardControls((state) => state.forward)
    const keyboardBackward = useKeyboardControls((state) => state.backward)
    const keyboardLeftward = useKeyboardControls((state) => state.leftward)
    const keyboardRightward = useKeyboardControls((state) => state.rightward)
    const keyboardJump = useKeyboardControls((state) => state.jump)

    const [deviceForward, setDeviceForward] = useState(false)
    const [deviceBackward, setDeviceBackward] = useState(false)
    const [deviceLeftward, setDeviceLeftward] = useState(false)
    const [deviceRightward, setDeviceRightward] = useState(false)

    useEffect(() => {
        const handleOrientation = (event) => {
            var x = event.beta  
            var y = event.gamma 
            
            if(x > 10) setDeviceForward(true)
            else if(x < -10) setDeviceBackward(true)
            else {
                setDeviceForward(false)
                setDeviceBackward(false)
            }

            if(y > 10) setDeviceRightward(true)
            else if(y < -10) setDeviceLeftward(true)
            else {
                setDeviceRightward(false)
                setDeviceLeftward(false)
            }
        }

        window.addEventListener('deviceorientation', handleOrientation, true)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [])

    useEffect(() =>
    {
        const unsubscribeEffect = addEffect(() =>
        {
            const state = useGame.getState()

            let elapsedTime = 0

            if(state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elapsedTime = state.endTime - state.startTime

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current)
                time.current.textContent = elapsedTime
        })

        return () =>
        {
            unsubscribeEffect()
        }
    }, [])

    return <div className="interface">

        {/* Time */}
        <div ref={ time } className="time">0.00</div>

        {/* Restart */}
        { phase === 'ended' && <div className="restart" onClick={ restart }>Restart</div> }

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ keyboardForward || deviceForward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ keyboardLeftward || deviceLeftward ? 'active' : '' }` }></div>
                <div className={ `key ${ keyboardBackward || deviceBackward ? 'active' : '' }` }></div>
                <div className={ `key ${ keyboardRightward || deviceRightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ keyboardJump ? 'active' : '' }` }></div>
            </div>
        </div>
        
    </div>
}
