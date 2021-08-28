import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProtocolNavigator from '../../../components/ProtocolNavigator';
import {
  CloudUploadIcon,
  CloudDownloadIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/solid';
import HttpMethodPill from '../../../components/HttpMethodPill';
import Viewport from '../../../components/Viewport';
import Navbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import SectionHeader from '../../../components/SectionHeader';
import ProtocolTable from '../../../components/ProtocolTable';

type Props = {
  handler: API.Handler;
  url: string;
};
const Handler: React.FC<Props> = ({ handler, url }) => {
  const router = useRouter();

  return (
    <Viewport>
      <Navbar
        icon={
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:bg-blue-100 transition-colors rounded p-1"
          >
            <ArrowLeftIcon className="w-5 mr-2" />
          </button>
        }
        title={handler?.name}
        subtitle={handler?.description}
      >
        <div className="flex items-center px-3 sm:p-0">
          <HttpMethodPill method={handler?.pathMethods?.[0].method} />
          <p className="text-gray-500 text-xl break-all">{handler?.pathMethods?.[0].path}</p>
          <a href={url} target="_blank">
            <InformationCircleIcon className="w-5 ml-1 mt-1 text-gray-400" />
          </a>
        </div>
      </Navbar>
      <MainContent>
        <div className="flex flex-col sm:flex-row items-center flex-wrap overflow-x-auto relative">
          <div className="flex flex-col flex-grow sm:w-5/12 min-w-min max-w-full m-3 self-stretch justify-self-stretch">
            {handler?.queryParameters ? (
              <>
                <SectionHeader
                  icon={<QuestionMarkCircleIcon className="w-5 mr-2" />}
                  title="Query Parameters"
                  bgColorClassName="bg-indigo-100 mr-3"
                />
                <ProtocolTable
                  rows={handler?.queryParameters?.map((queryParam, index) => (
                    <tr key={index} className="h-10">
                      <td className="pr-3">{queryParam.name}</td>
                      <td className="pr-3 text-blue-800">{queryParam.type}</td>
                      <td className="text-red-500 pr-3">
                        {queryParam.required ? 'required' : null}
                      </td>
                      <td>{queryParam.description}</td>
                    </tr>
                  ))}
                />
              </>
            ) : null}
            <ProtocolNavigator
              httpObj={handler?.requestBody}
              icon={<CloudUploadIcon className="w-5 mr-2" />}
              title="Request"
              bgColorClassName="bg-pink-100"
            />
          </div>

          <div className="flex flex-col flex-grow sm:w-5/12 min-w-min max-w-full m-3 self-stretch justify-self-stretch">
            <ProtocolNavigator
              httpObj={handler?.responseBody}
              icon={<CloudDownloadIcon className="w-5 mr-2" />}
              title="Response"
              bgColorClassName="bg-yellow-100"
            />
          </div>
        </div>
        <div className="max-w-full m-3">
          {handler?.possibleErrors?.map(errorObj => (
            <ProtocolNavigator
              httpObj={errorObj.details}
              icon={<ExclamationCircleIcon className="w-5 mr-2" />}
              title={`${errorObj.key} - ${errorObj.httpStatusCode}`}
              bgColorClassName="bg-red-400"
              textColorClassName="text-white"
            />
          ))}
        </div>
      </MainContent>
    </Viewport>
  );
};

export async function getServerSideProps({
  params: { environment, handler: handlerName }
}: {
  params: { environment: string; handler: string };
}) {
  const url = `https://${environment}.herokuapp.com/api/docs/handlers/${handlerName}`;
  const response = await axios.get<API.Handler>(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handler = response.data;

  return { props: { handler, url } };
}

export default Handler;
