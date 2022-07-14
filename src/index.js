import "./index.css";
import * as Tone from "tone";

document
  .querySelector("button:first-of-type")
  .addEventListener("click", async () => {
    await Tone.start();
    console.log("audio is ready");
  });

let body = document.querySelector("body");

// play a pattern
// document.querySelector("#note").addEventListener("click", () => {
//   let synth = new Tone.OmniOscillator();
//   synth.toDestination();

//   const pattern = new Tone.Pattern(
//     (time, note) => {
//       synth.triggerAttackRelease(note, 0.1);
//     },
//     ["C4", "D4", "E4", "G4", "A4"]
//   );

//   pattern.start(0);
//   Tone.Transport.start();

///});

/// const sampler = new Tone.Sampler({
// 	urls: {
// 		A1: "A1.mp3",
// 		A2: "A2.mp3",
// 	},
// 	baseUrl: "https://tonejs.github.io/audio/casio/",
// 	onload: () => {
// 		sampler.triggerAttackRelease(["F1", "E1", "G1", "A1"], 5);
// 	}
// }).toDestination();

const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];

synths[1].oscillator.type = "sine";
synths[2].oscillator.type = "sine";
synths[0].oscillator.type = "sine";

synths.forEach((synth) => synth.toDestination());
let notes = ["F4", "G3", "A4"];
let index = 0;

const rows = document.querySelectorAll("div.row");

Tone.Transport.scheduleRepeat(repeat, "8n");

function repeat(time) {
  let step = index % 8;
  for (let i = 0; i < rows.length; i++) {
    let synth = synths[i];
    let row = rows[i];
    let input = row.querySelector(`input:nth-child(${step + 1})`);
    if (input.checked) synth.triggerAttackRelease(notes[i], "8n", time);
  }
  index++;
}

document.querySelector("#note").addEventListener("click", () => {
  Tone.Transport.start();
});
