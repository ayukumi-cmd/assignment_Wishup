import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Button, message, Spin } from 'antd';

const { Title } = Typography;

export default function Marksheet() {
  const { hallTicket } = useRouter().query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hallTicket) return;
    fetch(`/api/result?hallTicket=${hallTicket}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Result not found");
        setLoading(false);
      });
  }, [hallTicket]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("Sharable link copied!");
  };

  const printPage = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) return null;

  const { name, email, marks, total, passed, disqualifiedSubject } = data;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: 20 }}>
      <Card style={{ maxWidth: 700, margin: '0 auto', borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Marksheet</Title>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
          <Descriptions.Item label="Hall Ticket">{hallTicket}</Descriptions.Item>
          <Descriptions.Item label="Math">{marks.math}</Descriptions.Item>
          <Descriptions.Item label="Physics">{marks.physics}</Descriptions.Item>
          <Descriptions.Item label="Chemistry">{marks.chemistry}</Descriptions.Item>
          <Descriptions.Item label="Total Marks">{total}</Descriptions.Item>
          {/* <Descriptions.Item label="Rank">{rank}</Descriptions.Item> */}
          <Descriptions.Item label="Status">{passed ? '✅ Passed' : '❌ Failed'}</Descriptions.Item>
          {disqualifiedSubject && (
            <Descriptions.Item label="Disqualified In" style={{ color: 'red' }}>
              {disqualifiedSubject}
            </Descriptions.Item>
          )}
        </Descriptions>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <Button onClick={printPage}>Download PDF</Button>
          <Button type="primary" onClick={copyLink}>Copy Sharable Link</Button>
        </div>
      </Card>
    </div>
  );
}
