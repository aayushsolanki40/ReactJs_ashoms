import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { allcompaniesApi } from './API/Userapis';

const dbName = "Ashoms";
var db = new Dexie(dbName);
// Dexie.exists(dbName).then(function(exists) {
//     if (!exists) {
db.version(1).stores({
    companies: "++id,Company_Name,Reference_No,SymbolTicker,Country,industry,image,exchanges,DelistingDate,company_status"
});
db.open();
// }
// })

function fetchDataCompaniesDB() {
    allcompaniesApi().then(metas => {
        metas.map((meta, index) => {
            db.companies.get({ id: meta.id }).then(singleCompany => {
                if (!singleCompany)
                    db.companies.add({ id: meta.id, Company_Name: meta.Company_Name, Reference_No: meta.Reference_No, SymbolTicker: meta.SymbolTicker, Country: meta.Country, industry: meta.industry, image: meta.image, exchanges: meta.exchanges, DelistingDate: meta.DelistingDate, company_status: meta.company_status });
            })
        })
    })
}

function getCompanies() {
    return new Promise(resolve => {
        db.table("companies").toArray().then(meta => resolve(meta))
            // const companies = db.companies.get({ id: "1" });
            // return companies;
    })
}

function companiesPaginationIndexed(country, searchtext, page) {
    let limit = 30;
    let offset = page * limit;
    return new Promise(resolve => {
        let search = "".toLowerCase();
        const regex = new RegExp(`${search}`);
        db.companies.orderBy('Company_Name').filter(function(company) { return regex.test((company.Company_Name).toLowerCase()) || regex.test((company.Country).toLowerCase()) || regex.test((company.SymbolTicker).toLowerCase()); })
            .offset(offset)
            .limit(limit)
            .toArray()
            .then(function(result) {
                resolve({ "metadata": { "total_pages": 1000, "current_page": page }, "data": result })
            });
    });
}

export { fetchDataCompaniesDB, getCompanies, companiesPaginationIndexed };