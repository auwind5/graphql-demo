import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('useeffect')
  }, [count])
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(prevCount => prevCount + 1)}></button>
    </div>
  )
}
