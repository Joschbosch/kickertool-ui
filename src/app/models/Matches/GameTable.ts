import { GameTableStatus } from './GameTableStatus.enum';

export class GameTable {

    public static createFromJSONList(jsonTables: GameTable[]) {
        const tables: GameTable[] = [];

        for (const table of jsonTables) {
            tables.push(GameTable.createFromJSON(table));
        }

        return tables;
    }

    public static createFromJSON(jsonTable: GameTable) {
        return new GameTable(
            jsonTable.tableNumber,
            jsonTable.status
        );
    }

    constructor(public tableNumber: number, public status: GameTableStatus) {}
}
