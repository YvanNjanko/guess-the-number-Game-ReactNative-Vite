import React, { useState, useEffect } from 'react';
import "../css/ClassementPage.css"


type DifficultyLevel = 'Très Difficile' | 'Difficile' | 'Normal';
const difficultyOrder: Record<DifficultyLevel, number> = {
    'Très Difficile': 3,
    'Difficile': 2,
    'Normal': 1,
  };
  
  

// Sample players data
const initialPlayers: Player[] = [
    { name: "Alice", difficulty: "Normal", score: 100 },
    { name: "Bob", difficulty: "Très Difficile", score: 200 },
    { name: "Charlie", difficulty: "Difficile", score: 150 },
    { name: "Dave", difficulty: "Normal", score: 120 },
    { name: "Eve", difficulty: "Très Difficile", score: 180 },
  ];
  
 
  interface Player {
    name: string;
    difficulty: DifficultyLevel;
    score: number;
  }
  
  const sortPlayers = (players: Player[]): Player[] => {
    return players.sort((a, b) => {
      if (difficultyOrder[b.difficulty] !== difficultyOrder[a.difficulty]) {
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      }
      return a.score - b.score;
    });
  };
  
  
  const PlayerTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Load players from localStorage or use initial data
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers).players);
    } else {
        setPlayers(initialPlayers);
    }
}, []);

const sortedPlayers = sortPlayers(players);
  return (
    <div>
      <h2>Player Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Diffuculté</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.difficulty}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
