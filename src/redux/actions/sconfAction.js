import types from './types';

export function updateSconf(aname, aemail, acallno, aaddress, aceo, abizname, abizelc, abizno, aprivacy, acustomer, aorder_point, areview_point, aphoto_review_point, abank_account, abank_date, abiz_hours, adistance, temp_mt_id) {

    return {
        type: types.UPDATE_SITE,
        aname: aname,
        aemail: aemail,
        acallno: acallno,
        aaddress: aaddress,
        aceo: aceo,
        abizname: abizname,
        abizelc: abizelc,
        abizno: abizno,
        aprivacy: aprivacy,
        acustomer: acustomer,
        aorder_point: aorder_point,
        areview_point: areview_point,
        aphoto_review_point: aphoto_review_point,
        abank_account: abank_account,
        abank_date: abank_date,
        abiz_hours: abiz_hours,
        adistance: adistance,
        temp_mt_id: temp_mt_id,
    };
}
