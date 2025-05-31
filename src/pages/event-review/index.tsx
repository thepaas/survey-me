import { useState } from 'react';

import thePaasLogoIcon from '@assets/images/logo-the-paas-white.png';
import connectIcon from '@assets/images/connect.png';
import { Header, Page } from '@components';
import { useDigitalIds } from '@pages/proof-event/add.hooks';
import { useNavigate, useParams } from 'react-router-dom';

const EventReview = () => {
  const { eventId } = useParams();

  const { digitalIds } = useDigitalIds();

  const [selectedCredentialId, setSetSelectedCredentialId] = useState('-1');

  const navigate = useNavigate();

  const submitHandler = () => {
    const credentialsId = Number(selectedCredentialId);

    if (isNaN(credentialsId) || credentialsId < 0)
      return alert('Select a credential');

    navigate(`/event/${eventId}/proof?credentialId=${selectedCredentialId}`);
  };

  return (
    <Page>
      <Header />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '1rem',
          textAlign: 'center',
        }}
      >
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
            style={{ height: 90, marginTop: '2.5rem' }}
          />
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 'auto',
          }}
        >
          <select
            name='credentials'
            id='credentials'
            onChange={(e) => setSetSelectedCredentialId(e.target.value)}
            value={selectedCredentialId}
            style={{
              width: '100%',
              padding: 10,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            <option value={'-1'}>select credentials</option>
            {digitalIds.map((_, i) => {
              return (
                <option key={i} value={i}>
                  test credential #{++i}
                </option>
              );
            })}
          </select>

          <div
            onClick={submitHandler}
            style={{
              marginTop: '1rem',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 16px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 22,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 20, fontFamily: 'League Spartan' }}>
              prove it with with
            </span>
            <img src={thePaasLogoIcon} alt='Paas Logo' style={{ height: 20 }} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EventReview;
