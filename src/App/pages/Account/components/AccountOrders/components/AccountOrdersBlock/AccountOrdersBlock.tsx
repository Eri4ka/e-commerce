const AccountOrdersBlock = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className='orders-item__block'>
      <p className='orders-item__label'>{`${label}:`}</p>
      <span className='orders-item__value'>{value}</span>
    </div>
  );
};

export default AccountOrdersBlock;
