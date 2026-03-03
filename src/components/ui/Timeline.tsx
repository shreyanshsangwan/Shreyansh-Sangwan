import React from 'react';
import { CheckCircle2, Circle, Truck, Package } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.title}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.status === 'completed'
                        ? 'bg-green-500'
                        : event.status === 'current'
                        ? 'bg-orange-500'
                        : 'bg-gray-200'
                    }`}
                  >
                    {event.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : event.status === 'current' ? (
                      <Truck className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.date}>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
