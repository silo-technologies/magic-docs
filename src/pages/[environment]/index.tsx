import { SearchIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import HttpMethodPill from '../../components/HttpMethodPill';
import MainContent from '../../components/MainContent';
import Navbar from '../../components/Navbar';
import Viewport from '../../components/Viewport';

type Props = {
  handlers: API.HandlerSummary[];
};
const Environment: React.FC<Props> = ({ handlers }) => {
  const router = useRouter();
  const { environment } = router.query;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    searchRef.current?.focus();
  }, [searchRef.current]);

  return (
    <Viewport>
      <Navbar icon="✨" title="Magic Handlers" subtitle="Directory of API endpoints for silo-go">
        <div className="relative flex-grow">
          <div
            className="absolute h-full cursor-pointer"
            onClick={() => searchRef.current?.focus()}
          >
            <div className="flex flex-col h-full px-3 justify-center items-center">
              <SearchIcon className="w-6 text-gray-300" />
            </div>
          </div>
          <input
            type="text"
            ref={searchRef}
            onChange={e => setSearchText(e.target.value?.toLowerCase() ?? '')}
            className="p-3 pl-10 w-full box-border border border-gray-200 rounded transition-colors hover:border-blue-300"
            placeholder="Search for an endpoint..."
          />
        </div>
      </Navbar>
      <MainContent>
        <table className="w-full max-w-full table-fixed sm:table-auto">
          <tbody className="bg-white divide-y divide-gray-200">
            {handlers
              .filter(handler => {
                return (
                  handler.name?.toLowerCase().includes(searchText) ||
                  handler.path?.toLowerCase().includes(searchText) ||
                  handler.httpMethod?.toLowerCase().includes(searchText)
                );
              })
              .map((handler, index) => (
                <tr
                  key={index} // This won't change since we only load the list once and never modify it. The names and paths are NOT unique
                  className="h-14 hover:bg-indigo-100 cursor-pointer"
                  onClick={() => {
                    router.push(`${environment}/handler/${handler.name}`);
                  }}
                >
                  <td className="sm:text-right w-20 sm:w-auto">
                    <HttpMethodPill method={handler.httpMethod} />
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="break-all sm:break-normal">{handler.name}</span>
                      <span className="text-gray-400 sm:hidden break-all">{handler.path}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell">{handler.path}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </MainContent>
    </Viewport>
  );
};

export async function getServerSideProps({
  params: { environment }
}: {
  params: { environment: string };
}) {
  const url = `https://${environment}.herokuapp.com/api/docs/handlers`;
  const response = await axios.get<API.HandlerSummary[]>(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handlers = response.data.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? -1);
  return { props: { handlers } };
}

export default Environment;
