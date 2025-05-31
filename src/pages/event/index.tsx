import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import thePaasLogoIcon from '@assets/images/logo-the-paas-white.png';
import connectIcon from '@assets/images/connect.png';
import { Header, Page } from '@components';
import { useDigitalIds } from '@pages/proof-event/add.hooks';

const Event = () => {
  const navigate = useNavigate();

  const { eventId } = useParams();

  const submit = () => {
    const paasWindow = window.open(
      `${import.meta.env.VITE_THE_PAAS_HOST}/front/oidc-login`
    );

    const checkWindowClosed = setInterval(() => {
      if (paasWindow && paasWindow.closed) {
        clearInterval(checkWindowClosed);
        navigate(`/event/${eventId}/review`);
      }
    }, 500);
  };

  const { addDigitalIds } = useDigitalIds();

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent<{ type: 'data'; value: string[] }>
    ) => {
      if (event?.data?.type !== 'data') return;

      const digitalIds = event.data.value;

      addDigitalIds(digitalIds);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [addDigitalIds]);

  return (
    <Page>
      <Header />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 16,
          textAlign: 'center',
        }}
      >
        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            marginBottom: 2,
            marginTop: '3rem',
          }}
        >
          TEEN INSIGHTS SURVEY 6/2025
        </div>

        {/* Logo Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <img
            src={connectIcon}
            alt='Paas Logo'
            style={{ height: 90, marginTop: '4rem' }}
          />
        </div>

        {/* CTA Button */}
        <div
          onClick={submit}
          style={{
            marginTop: 'auto',
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px 16px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 20, fontFamily: 'League Spartan' }}>
            check eligibility with
          </span>
          <img src={thePaasLogoIcon} alt='Paas Logo' style={{ height: 20 }} />
        </div>
      </div>
    </Page>
  );
};

export default Event;
