import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Card, Typography, message } from 'antd';

const { Title } = Typography;

export default function Home() {
  const [hallTicket, setHallTicket] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!hallTicket.trim()) {
      message.error("Please enter your hall ticket number");
      return;
    }

    const res = await fetch(`/api/result?hallTicket=${hallTicket}`);
    if (res.ok) {
      router.push(`/marksheet/${hallTicket}`);
    } else {
      message.error("Result not found");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #001529, #1677ff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <Card style={{ width: 400, borderRadius: 10 }}>
        <Title level={3} style={{ textAlign: 'center' }}>IIT JEE Result Checker</Title>
        <Input
          placeholder="Enter Hall Ticket Number"
          value={hallTicket}
          onChange={e => setHallTicket(e.target.value)}
          size="large"
        />
        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 16 }}
          onClick={handleSubmit}
        >
          Check Result
        </Button>
      </Card>
    </div>
  );
}
