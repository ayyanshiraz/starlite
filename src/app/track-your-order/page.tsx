import type { Metadata } from 'next';
import TrackOrderClient from './TrackOrderClient';

export const metadata: Metadata = {
  title: 'Track Your Order | Starlight Linkers',
  description: 'Check the status of your order and estimated delivery date.',
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}