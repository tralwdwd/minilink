import { Databases, Client, ID, TablesDB, Query } from "appwrite";
import { makeShortCode } from "./shortener";

class MiniLinkClient {
    client: Client;
    database: TablesDB;
    constructor() {
        this.client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
        this.database = new TablesDB(this.client);
    }

    newLink = async (url: string) => {
        let Id = ID.unique();
        let code = makeShortCode(Id);
        await this.database.createRow({
            databaseId: "68ade7f6002a4a177e2f",
            tableId: "links",
            rowId: Id,
            data: { url, code },
        });
        return code;
    }
    getUrl = async (code: string) => {
        let result = await this.database.listRows(
            {
                databaseId: "68ade7f6002a4a177e2f",
                tableId: "links",
                queries: [
                    Query.equal("code", code)
                ]
            }
        )
        if (result.total === 0){
            return null;
        }
        return result.rows[0].url;
    }
}
export const miniLinkClient = new MiniLinkClient();