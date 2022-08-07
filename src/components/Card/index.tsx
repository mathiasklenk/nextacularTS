interface ICardProps {
  children: any;
  danger?: any;
}

const Card: React.FC<ICardProps> = ({ children, danger }) => {
  return danger ? (
    <div className="flex flex-col justify-between border-2 border-red-600 rounded">
      {children}
    </div>
  ) : (
    <div className="flex flex-col justify-between border rounded dark:border-gray-600">
      {children}
    </div>
  );
};

export default Card;
