import araria from './araria.json';
import arwal from './arwal.json';
import aurangabad from './aurangabad.json';
import banka from './banka.json';
import begusarai from './begusarai.json';
import bhagalpur from './bhagalpur.json';
import bhojpur from './bhojpur.json';
import buxar from './buxar.json';
import darbhanga from './darbhanga.json';
import east_champaran from './east_champaran.json';
import gaya from './gaya.json';
import gopalganj from './gopalganj.json';
import jamui from './jamui.json';
import jehanabad from './jehanabad.json';
import kaimur from './kaimur.json';
import katihar from './katihar.json';
import khagaria from './khagaria.json';
import kishanganj from './kishanganj.json';
import lakhisarai from './lakhisarai.json';
import madhepura from './madhepura.json';
import madhubani from './madhubani.json';
import munger from './munger.json';
import muzaffarpur from './muzaffarpur.json';
import nalanda from './nalanda.json';
import nawada from './nawada.json';
import patna from './patna.json';
import purnia from './purnia.json';
import rohtas from './rohtas.json';
import saharsa from './saharsa.json';
import samastipur from './samastipur.json';
import saran from './saran.json';
import sheikhpura from './sheikhpura.json';
import sheohar from './sheohar.json';
import sitamarhi from './sitamarhi.json';
import siwan from './siwan.json';
import supaul from './supaul.json';
import vaishali from './vaishali.json';
import west_champaran from './west_champaran.json';
import { Place } from '../../../types/place';

// Export the combined list of places.
export const allPlaces: Place[] = [
  ...araria,
  ...arwal,
  ...aurangabad,
  ...banka,
  ...begusarai,
  ...bhagalpur,
  ...bhojpur,
  ...buxar,
  ...darbhanga,
  ...east_champaran,
  ...gaya,
  ...gopalganj,
  ...jamui,
  ...jehanabad,
  ...kaimur,
  ...katihar,
  ...khagaria,
  ...kishanganj,
  ...lakhisarai,
  ...madhepura,
  ...madhubani,
  ...munger,
  ...muzaffarpur,
  ...nalanda,
  ...nawada,
  ...patna,
  ...purnia,
  ...rohtas,
  ...saharsa,
  ...samastipur,
  ...saran,
  ...sheikhpura,
  ...sheohar,
  ...sitamarhi,
  ...siwan,
  ...supaul,
  ...vaishali,
  ...west_champaran,
] as unknown as Place[];
