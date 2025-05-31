import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Header, Page } from '@components';
import { generateProof, verifyProof } from './add.api';
import type { JwkEcdsaPublicKey } from './es256';
import { useDigitalIds } from './add.hooks';
import connectIcon from '@assets/images/connect.png';
import CheckboxInput from './components/checkbox-input';

const ProofEvent = () => {
  const [searchParams] = useSearchParams();
  const credentialId = parseInt(searchParams.get('credentialId') as string);

  const { eventId } = useParams();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isDobChecked, setIsDobChecked] = useState(false);

  const { digitalIds } = useDigitalIds();

  const toggleUsername = () => setIsUsernameChecked((p) => !p);
  const toggleDob = () => setIsDobChecked((p) => !p);

  const submitHandler = async () => {
    try {
      if (isSubmitting) return;

      if (!isDobChecked) return alert('Birth year is mandatory field!');

      if (!digitalIds.length || isNaN(credentialId))
        throw new Error('Credential not found');

      const credential = digitalIds[credentialId];
      if (!credential) throw new Error('Credential not found');

      setIsSubmitting(true);

      const { claimsInput, jwt } = JSON.parse(credential) as {
        claimsInput: string;
        jwt: string;
      };
      const {
        cnf: { jwk },
      } = jwtDecode<{ cnf: { jwk: JwkEcdsaPublicKey } }>(jwt);

      const filteredClaimsInput = isUsernameChecked
        ? claimsInput
        : claimsInput
            .split('\n')
            .filter((e) => !e.includes('name'))
            .join('\n');

      const result = await generateProof(filteredClaimsInput, jwk, jwt);
      if (!result) throw new Error('Failed to generate proof');
      const { proof, publicSignals } = result;

      await verifyProof(proof, publicSignals);

      navigate(`/event/${eventId}/proof/success`);
    } catch (e) {
      console.error('Gen proof error: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Header />

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
          style={{ height: 90, marginTop: '3rem' }}
        />
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ marginLeft: '2rem' }}>
          <CheckboxInput
            checked={isUsernameChecked}
            label='username'
            onChange={toggleUsername}
          />
          <CheckboxInput
            checked={isDobChecked}
            label='birth year'
            onChange={toggleDob}
          />
        </div>

        <div
          style={{
            marginTop: 'auto',
          }}
        >
          <div
            onClick={submitHandler}
            style={{
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
            {isSubmitting ? (
              <span style={{ fontSize: 20, fontFamily: 'League Spartan' }}>
                loading...
              </span>
            ) : (
              <span style={{ fontSize: 20, fontFamily: 'League Spartan' }}>
                generate proof
              </span>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ProofEvent;
