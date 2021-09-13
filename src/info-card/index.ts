import InternalInfoCard from './InfoCard';
import InfoCardMeta from './Meta';
import { InfoCardProps, InfoCardMetaProps } from './interfaces';

const InfoCard = InternalInfoCard as typeof InternalInfoCard & {
  Meta: typeof InfoCardMeta;
};

InfoCard.Meta = InfoCardMeta;

export { InfoCardMeta, InfoCardProps, InfoCardMetaProps };
export default InfoCard;
