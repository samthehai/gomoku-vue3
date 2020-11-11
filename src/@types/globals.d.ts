
import { GAME_PHRASES, PLAYER_SYMBOLS, PLAYERS, COMPUTER_AGENTS, GAME_MODE } from '@/lib/constants'

export type GamePhrases = typeof GAME_PHRASES[number];

export type PlayerSymbols = typeof PLAYER_SYMBOLS[number];

export type PlayerInfo = {
  name: string;
  symbol: PlayerSymbols;
  score: number;
};

export type Player = typeof PLAYERS[number];

export type ComputerAgent = typeof COMPUTER_AGENTS[number];

export type GameMode = typeof GAME_MODE[number];
