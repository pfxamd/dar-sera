export function localDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function dateValue(value) { if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN; const [y,m,d]=value.split('-').map(Number); const n=Date.UTC(y,m-1,d); return new Date(n).toISOString().slice(0,10)===value?n:NaN; }
export function nightsBetween(arrival,departure) { return (dateValue(departure)-dateValue(arrival))/86400000; }
/** @returns {Record<string,string>} */
export function validateDates(arrival,departure,adults,today=localDate()) {
 const errors={};
 if(!Number.isFinite(dateValue(arrival))) errors.arrival='Choose a valid arrival date.';
 else if(arrival<today) errors.arrival='Arrival cannot be in the past.';
 if(!Number.isFinite(dateValue(departure))) errors.departure='Choose a valid departure date.';
 else if(Number.isFinite(dateValue(arrival))&&!(nightsBetween(arrival,departure)>0)) errors.departure='Departure must be after arrival.';
 if(![1,2].includes(Number(adults))) errors.adults='Choose 1 or 2 adults.';
 return errors;
}
export function formatDate(value) { const n=dateValue(value); return Number.isFinite(n)?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(n):'Not selected'; }
