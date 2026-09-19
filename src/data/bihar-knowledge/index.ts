// District Data
import districtsData from './09-districts/districts.json';

// Basics
import biharAtAGlance from './01-basics/bihar-at-a-glance.json';
import stateSymbols from './01-basics/state-symbols.json';
import basicFacts from './01-basics/basic-facts.json';

// History
import ancientHistory from './02-history/ancient.json';
import medievalHistory from './02-history/medieval.json';
import modernHistory from './02-history/modern.json';
import freedomMovement from './02-history/freedom-movement.json';
import importantEvents from './02-history/important-events.json';

// Geography
import physicalGeography from './03-geography/physical-geography.json';
import rivers from './03-geography/rivers.json';
import climate from './03-geography/climate.json';
import soils from './03-geography/soils.json';
import agricultureGeography from './03-geography/agriculture-geography.json';
import naturalResources from './03-geography/natural-resources.json';

// Polity
import polity from './04-polity/polity.json';
import administration from './04-polity/administration.json';
import legislature from './04-polity/legislature.json';
import judiciary from './04-polity/judiciary.json';
import localGovernment from './04-polity/local-government.json';
import elections from './04-polity/elections.json';

// Economy
import economy from './05-economy/economy.json';
import agriculture from './05-economy/agriculture.json';
import industry from './05-economy/industry.json';
import infrastructure from './05-economy/infrastructure.json';
import budget from './05-economy/budget.json';

// Society
import demographics from './06-society/demographics.json';
import census from './06-society/census.json';
import languages from './06-society/languages.json';
import communities from './06-society/communities.json';
import socialDevelopment from './06-society/social-development.json';

// Culture
import art from './07-culture/art.json';
import music from './07-culture/music.json';
import dance from './07-culture/dance.json';
import literature from './07-culture/literature.json';
import festivals from './07-culture/festivals.json';
import cuisine from './07-culture/cuisine.json';
import crafts from './07-culture/crafts.json';

// Environment
import ecology from './08-environment/ecology.json';
import forests from './08-environment/forests.json';
import wildlife from './08-environment/wildlife.json';
import protectedAreas from './08-environment/protected-areas.json';

// People
import personalities from './10-people/personalities.json';

// Institutions
import institutions from './11-institutions/institutions.json';

// Development
import education from './12-development/education.json';
import health from './12-development/health.json';
import schemes from './12-development/schemes.json';
import developmentIndicators from './12-development/development-indicators.json';

// BPSC
import topicMapping from './13-bpsc/topic-mapping.json';
import prelimsTopics from './13-bpsc/prelims-topics.json';
import mainsTopics from './13-bpsc/mains-topics.json';

export const BiharKnowledgeData = {
  districts: districtsData.data || [],
  
  basics: {
    glance: biharAtAGlance.data || [],
    symbols: stateSymbols.data || [],
    facts: basicFacts.data || []
  },
  
  history: {
    ancient: ancientHistory.data || [],
    medieval: medievalHistory.data || [],
    modern: modernHistory.data || [],
    freedomMovement: freedomMovement.data || [],
    events: importantEvents.data || []
  },
  
  geography: {
    physical: physicalGeography.data || [],
    rivers: rivers.data || [],
    climate: climate.data || [],
    soils: soils.data || [],
    agriculture: agricultureGeography.data || [],
    resources: naturalResources.data || []
  },
  
  polity: {
    overview: polity.data || [],
    administration: administration.data || [],
    legislature: legislature.data || [],
    judiciary: judiciary.data || [],
    localGovernment: localGovernment.data || [],
    elections: elections.data || []
  },
  
  economy: {
    overview: economy.data || [],
    agriculture: agriculture.data || [],
    industry: industry.data || [],
    infrastructure: infrastructure.data || [],
    budget: budget.data || []
  },
  
  society: {
    demographics: demographics.data || [],
    census: census.data || [],
    languages: languages.data || [],
    communities: communities.data || [],
    development: socialDevelopment.data || []
  },
  
  culture: {
    art: art.data || [],
    music: music.data || [],
    dance: dance.data || [],
    literature: literature.data || [],
    festivals: festivals.data || [],
    cuisine: cuisine.data || [],
    crafts: crafts.data || []
  },
  
  environment: {
    ecology: ecology.data || [],
    forests: forests.data || [],
    wildlife: wildlife.data || [],
    protectedAreas: protectedAreas.data || []
  },
  
  people: {
    personalities: personalities.data || []
  },
  
  institutions: {
    all: institutions.data || []
  },
  
  development: {
    education: education.data || [],
    health: health.data || [],
    schemes: schemes.data || [],
    indicators: developmentIndicators.data || []
  },
  
  bpsc: {
    mapping: topicMapping.data || [],
    prelims: prelimsTopics.data || [],
    mains: mainsTopics.data || []
  }
};
