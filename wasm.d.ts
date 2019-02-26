/* tslint:disable */
export function lci_eval(arg0: string): string;
export function nix_parse(arg0: string): string;
export function image_to_string(arg0: Uint8Array): string;
export function insult(): string;
export class CanMove {
  free(): void;
  illegal: boolean;
  checkmate: boolean;
  check(): string;
}
export class ChessTerm {
  free(): void;
  constructor(arg0: any);
  draw(): void;
  command(arg0: string): void;
}
export class ChessBoard {
  free(): void;
  constructor();
  can_move(arg0: string, arg1: string): CanMove;
  do_move(arg0: any): boolean;
}
