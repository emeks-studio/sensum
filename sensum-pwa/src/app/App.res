
%%raw(`
import Sensations from '../blockchain/eth/Sensations';

// The first time it will break, given array of sensations is empty!
Sensations.getSensationByIndex(0)
  .then (result => console.log(result))
  .catch (err => console.error(err))

Sensations.newSensation({
    author: "mk",
    message: "los Granujas sean unidos porque esa es la ley 1ra"
  })
  .then (result => {
    console.log(result)
    return Sensations.getLatestSensation()
   })
  .then (result => console.log(result))
  .catch (err => console.error(err))
`)

@react.component
let make = () => {
  <div>
    <h1 className="text-4xl font-bold"> {"Sensum PWA"->React.string} </h1>
    <p className="text-2xl"> {"viteJs + react + rescript + tailwindcss"->React.string} </p>
  </div>
}
