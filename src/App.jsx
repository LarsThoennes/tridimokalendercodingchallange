import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css'; // CSS Datei von Mobiscroll wird importiert
import { Datepicker, Eventcalendar, getJson, setOptions } from '@mobiscroll/react'; // Mobiscroll Funktionen werden importiert

setOptions({ // 
  theme: 'ios', // Hier könnte man Material / Windows  verwenden 
  themeVariant: 'light' // Hier könnte man z.B. dark verwenden etc.
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const dayView = useMemo(() => ({ schedule: { type: 'day' } }), []);

  const handleDateChange = useCallback((args) => { // Wird aufgerufen wenn sich das datum im datepicker ändert
    setSelectedDate(args.value);
  }, []);

  const handleSelectedDateChange = useCallback((args) => { // Wird aufgerufen wenn sich das Datum im Eventcalender ändert
    setSelectedDate(args.date);
  }, []);

  // Ruft die Daten von der API ab
  useEffect(() => { // Wird ausgeführt wenn die Component das erstemal geladen wird
    fetch('https://hook.eu1.make.com/2arll9f3zzxg6a42h6nsqiy4lmpfpi62') // URL der Api wird gefetcht
      .then(response => response.json()) // Daten werden als json gespeichert
      .then(data => { // Daten werden verarbeitet wie MobiScroll sie benötigt: start, end und title
        const events = data.termine.map(event => ({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title
        }));
        setEvents(events); // Speichert die daten in der konstanten myEvents
      })
      .catch(error => { // Wirft bei Bedarf einen Fehler
        console.error('Error fetching data:', error);
      });
  }, []);

  // Erstellt den vorgebenen HTML-Teil von Mobiscroll
  return (
    <div className="mds-external-nav-scheduler mbsc-flex">
        {/* Kalender Funktion oben links */}
      <div className="mds-external-nav-dp">
        <Datepicker display="inline" value={mySelectedDate} onChange={handleDateChange} />
      </div>
        {/* Der Main Kalender in dem die Termine angezeigt werden */}
      <div className="mds-external-nav-ec mbsc-flex-1-1">
        <Eventcalendar data={myEvents} selectedDate={mySelectedDate} view={dayView} onSelectedDateChange={handleSelectedDateChange} />
      </div>
    </div>
  );
}

export default App;
