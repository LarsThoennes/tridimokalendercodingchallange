import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css'; 
import { Datepicker, Eventcalendar, Page, setOptions, localeDe, CalendarNav, Segmented, SegmentedGroup } from '@mobiscroll/react';
import Header from './components/header';

setOptions({
  locale: localeDe,
  theme: 'ios',
  themeVariant: 'light'
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); 
  const [calView, setCalView] = useState({ schedule: { type: 'month' } }); 

  const calInst = useRef();

  useEffect(() => {
    fetch('https://hook.eu1.make.com/2arll9f3zzxg6a42h6nsqiy4lmpfpi62')
      .then(response => response.json())
      .then(data => {
        const events = data.termine.map(event => ({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title
        }));
        setEvents(events);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDateChange = useCallback((args) => {
    setSelectedDate(args.value);
  }, []);

  const changeView = useCallback((event) => {
    let newCalView;

    switch (event.target.value) {
      case 'week':
        newCalView = { schedule: { type: 'week' } };
        break;
      case 'month':
      default:
        newCalView = { schedule: { type: 'month' } };
        break;
    }

    setView(event.target.value); 
    setCalView(newCalView);  
  }, []);

  const renderMyHeader = useCallback(
    () => (
      <>
        <CalendarNav />
        <SegmentedGroup value={view} onChange={changeView}>
          <Segmented className='change-period' value="week">Week</Segmented>
          <Segmented className='change-period' value="month">Month</Segmented>
        </SegmentedGroup>
      </>
    ),
    [changeView, view],
  );

  return (
    <>
      <Header></Header>
      <Page className="mds-full-height">
        <div className="mds-full-height mbsc-flex">
          <div className="mds-external-nav-dp">
            <Datepicker value={mySelectedDate} display="inline" onChange={handleDateChange} />
          </div>
          <div className="mds-search-calendar mbsc-flex-1-1">
            <Eventcalendar
              clickToCreate={false}
              data={myEvents}
              dragToCreate={false}
              dragToMove={false}
              dragToResize={false}
              ref={calInst}
              view={calView} 
              selectedDate={mySelectedDate}
              renderHeader={renderMyHeader}
            />
          </div>
        </div>
      </Page>
    </>
  );
}

export default App;
