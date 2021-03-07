import {
  GAME_PHRASES,
  PLAYER_SYMBOLS,
  PLAYER_TURNS,
  COMPUTER_AGENTS,
  GAME_MODE
} from '@/models/gomoku/constants'

export type GamePhrase = typeof GAME_PHRASES[number];

export type PlayerSymbol = typeof PLAYER_SYMBOLS[number];

export type PlayerTurn = typeof PLAYER_TURNS[number];

export type ComputerAgent = typeof COMPUTER_AGENTS[number];

export type GameMode = typeof GAME_MODE[number];
