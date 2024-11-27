import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function PatientForm() {
  const [steps, setSteps] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add data to the Firestore collection
      await addDoc(collection(db, "rehabilitationData"), {
        steps: Number(steps),
        duration: Number(duration),
        difficulty: Number(difficulty),
        timestamp: serverTimestamp(),
      });
      alert("Data submitted successfully!");
      setSteps("");
      setDuration("");
      setDifficulty("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting data.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Rehabilitation Data</h2>
      <label>
        Steps:
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </label>
      <br />
      <label>
        Duration (minutes):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <br />
      <label>
        Difficulty (1-10):
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PatientForm;
