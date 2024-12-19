import { Pool } from "pg"
import { FormData,ChkQry } from "./types"
import dotenv from "dotenv"

dotenv.config();

const _env = process.env

const conn = new Pool({
    user: _env.PUSER!,
    password: _env.PPASS!,
    database: _env.PDB!,
    port: parseInt(_env.PPORT!),
    host: _env.PHOST!,
})


export async function writeData (data:FormData) {
    const chkPK = await conn.query(`SELECT empid,email FROM employee`);
    const chk = {empid: data.empid, email: data.email};
    let flag=0;
    chkPK.rows.every( (obj: ChkQry) => {
        if (chk.empid==obj.empid) {flag=1; return false;}
        else if (chk.email==obj.email) {flag=2; return false;}
        return true;
    } )

    if (flag==0) {
        const res = await conn.query(`
            INSERT INTO employee VALUES (
                '${data.empid}','${data.fname}','${data.lname}','${data.email}','${data.role}','${data.dept}','${data.phone}','${data.joind}'
            )
        `);
    }
    return {
        flag: flag
    };
}
