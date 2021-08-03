/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @types
import { constantCase } from 'constant-case';

import { DID } from 'dids';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import type { ResolverRegistry } from 'did-resolver';
import type { CeramicApi } from '@ceramicnetwork/common';
import { IDX } from '@ceramicstudio/idx';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import Authereum from 'authereum';
import type { DIDProvider } from 'dids';
import Fortmatic from 'fortmatic';
import Web3Modal from 'web3modal';
import Ceramic from '@ceramicnetwork/http-client';

import { PATH_PAGE } from '../routes/paths';
import { ActionMap, AuthState, AuthUser, Web3ContextType } from '../@types/authentication';
// ----------------------------------------------------------------------

// @ts-ignore
export const threeID = new ThreeIdConnect();

export const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7'
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_EC842EEAC7F08995'
      }
    },
    authereum: {
      package: Authereum,
      options: {}
    }
  }
});

export async function getProvider(): Promise<DIDProvider> {
  const ethProvider = await web3Modal.connect();
  const addresses = await ethProvider.enable();
  await threeID.connect(new EthereumAuthProvider(ethProvider, addresses[0]));
  return threeID.getDidProvider();
}

const initialState: AuthState = {
  isAuthenticated: true,
  isInitialized: true,
  user: null
};

enum Types {
  Initial = 'INITIALISE'
}

type Web3AuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type Web3Actions = ActionMap<Web3AuthPayload>[keyof ActionMap<Web3AuthPayload>];

async function createCeramic(): Promise<CeramicApi> {
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com');
  window.ceramic = ceramic;
  window.TileDocument = TileDocument;
  window.Caip10Link = Caip10Link;
  return Promise.resolve(ceramic as CeramicApi);
}

const ceramicPromise = createCeramic();

export function createIDX(ceramic: CeramicApi): IDX {
  const idx = new IDX({ ceramic });
  window.idx = idx;
  return idx;
}

const authenticate = async (): Promise<string> => {
  const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()]);
  const keyDidResolver = KeyDidResolver.getResolver();
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver
  };
  const did = new DID({
    provider,
    resolver: resolverRegistry
  });
  await did.authenticate();
  await ceramic.setDID(did);
  const idx = createIDX(ceramic);
  window.did = ceramic.did;
  return idx.id;
};

const reducer = (state: AuthState, action: Web3Actions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext<Web3ContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<any>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      const id = await authenticate();
      console.log('Connected with DID:', id);
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  const logout = async () => {
    // await firebase.auth().signOut();
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: {
          id: auth.uid
        },
        logout,
        connectWallet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
