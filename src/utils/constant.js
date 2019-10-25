export const AccountFile = 'accountInfo';
export const KeyStoreFile = 'keystoreInfo';
export const TxInfoFile = 'txInfo';
export const ContractABIFile = 'contractABI';
export const ContractNameFile = 'contractName';
export const TxHistoryFile = 'txHistory';
export const DefaultSelfAddress = 'defaultAddr';

export const PublicKeyPrefix = '0x04';
export const ChainIdPrefix = 'ChainProvider-';

export const AIDeveloper = 'AIDeveloper';
export const RobotMgr = 'RobotMgr';
export const SoccerManager = 'SoccerManager';
export const EmulatePlatform = 'EmulatePlatform';
export const Competition = 'Competition';

export const AIDeveloperABI = '[{"payable":false,"type":"function","constant":true,"inputs":[],"name":"getDevNum","outputs":[{"name":"devNum","type":"uint256"}]},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_desc","type":"string"},{"name":"_storeUrl","type":"string"},{"name":"_hashValue","type":"bytes32"},{"name":"_size","type":"uint256"}],"name":"addAIProcedure","outputs":[{"name":"aiProcedureId","type":"uint256"}],"payable":false,"type":"function"},{"type":"function","constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"aiProcedureMap","outputs":[{"name":"","type":"uint256"}],"payable":false},{"payable":false,"type":"function","constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getAIProcedureById","outputs":[{"name":"exist","type":"bool"},{"name":"name","type":"string"},{"name":"desc","type":"string"},{"name":"url","type":"string"},{"type":"bytes32","name":"hash"},{"name":"size","type":"uint256"},{"name":"owner","type":"address"}]},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"type":"string","name":"_name"},{"name":"_org","type":"string"},{"name":"_desc","type":"string"},{"name":"_headIconUrl","type":"string"},{"type":"string","name":"_blogUrl"}],"name":"modifyInfo"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_org","type":"string"},{"name":"_desc","type":"string"},{"name":"_headIconUrl","type":"string"},{"type":"string","name":"_blogUrl"}],"name":"registerDev","outputs":[{"name":"developerId","type":"uint256"}],"payable":false,"type":"function"},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[],"name":"renounceOwnership"},{"inputs":[],"name":"getMyInfo","outputs":[{"name":"devId","type":"uint256"},{"type":"string","name":"name"},{"type":"string","name":"org"},{"name":"desc","type":"string"},{"name":"headIconUrl","type":"string"},{"name":"blogUrl","type":"string"},{"name":"aiProcedures","type":"uint256[]"}],"payable":false,"type":"function","constant":true},{"inputs":[{"type":"bytes32","name":"_hashValue"}],"name":"getAIProcedureByHash","outputs":[{"name":"exist","type":"bool"},{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"desc","type":"string"},{"name":"url","type":"string"},{"name":"size","type":"uint256"},{"type":"address","name":"owner"}],"payable":false,"type":"function","constant":true},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"aiProcedureList","outputs":[{"name":"id","type":"uint256"},{"name":"uploadTime","type":"uint64"},{"name":"storeUrl","type":"string"},{"name":"hashValue","type":"bytes32"},{"name":"size","type":"uint256"},{"type":"address","name":"owner"},{"name":"name","type":"string"},{"name":"desc","type":"string"}],"payable":false,"type":"function"},{"type":"function","constant":false,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"devList","outputs":[{"name":"id","type":"uint256"},{"type":"string","name":"name"},{"name":"org","type":"string"},{"name":"desc","type":"string"},{"name":"headIconUrl","type":"string"},{"name":"blogUrl","type":"string"},{"name":"owner","type":"address"}],"payable":false},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"getDevInfo","outputs":[{"name":"developerId","type":"uint256"},{"name":"name","type":"string"},{"name":"org","type":"string"},{"name":"desc","type":"string"},{"name":"headIconUrl","type":"string"},{"name":"blogUrl","type":"string"},{"name":"aiProcedures","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addrDevMap","outputs":[{"type":"uint256","name":""}],"payable":false,"type":"function"},{"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function","constant":false},{"payable":false,"type":"constructor","inputs":[]},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"devId","type":"uint256"},{"indexed":false,"name":"name","type":"string"}],"name":"RegisterDev","type":"event"},{"name":"ModifyDevInfo","type":"event","anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"devId","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"name":"devId","type":"uint256","indexed":false},{"name":"aiProcedureId","type":"uint256","indexed":false}],"name":"AddAIProcedure","type":"event"}]';
export const RobotMgrABI = '[{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"forceRentalEnd"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"rentSublettedRobot","outputs":[],"payable":true,"type":"function"},{"outputs":[{"name":"robotId","type":"uint256"}],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_aiProcedureId","type":"uint256"},{"name":"_bodyImageUrl","type":"string"}],"name":"createRobot"},{"payable":false,"type":"function","constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"type":"uint256","name":"price"}],"name":"sublet","outputs":[]},{"inputs":[{"type":"uint256","name":"_robotId"}],"name":"rentalTimeRemaining","outputs":[{"name":"remainTime","type":"uint256"}],"payable":false,"type":"function","constant":true},{"name":"setRentalPricePerSecond","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"type":"uint256","name":"_robotId"},{"name":"_pricePerSecond","type":"uint256"}]},{"inputs":[{"name":"_robotId","type":"uint256"}],"name":"rentalAccumulatedPrice","outputs":[{"type":"uint256","name":"price"}],"payable":false,"type":"function","constant":true},{"name":"getOwnershipRobotIds","outputs":[{"name":"robotIds","type":"uint256[]"}],"payable":false,"type":"function","constant":true,"inputs":[{"type":"address","name":"owner"}]},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"renterToRentInfos","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRobotNum","outputs":[{"name":"robotNum","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"robotInSubletting","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_pricePerHour","type":"uint256"},{"name":"_minRentalTime","type":"uint256"},{"name":"_maxRentalTime","type":"uint256"}],"name":"rentableSetup","outputs":[],"payable":false,"type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"type":"function","constant":false},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"rent","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"rentalElapsedTime","outputs":[{"name":"elapsedTime","type":"uint256"}],"payable":false,"type":"function"},{"name":"setCompetition","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"competitionAddr","type":"address"}]},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"cancelSublet","outputs":[],"payable":false,"type":"function"},{"payable":false,"type":"function","constant":true,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"getRobotUsageRightOwner","outputs":[{"name":"userAddr","type":"address"}]},{"name":"rentalTotalTime","outputs":[{"name":"totalTime","type":"uint256"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_robotId","type":"uint256"}]},{"constant":false,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"type":"function","constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false},{"constant":false,"inputs":[{"type":"address","name":"soccerManagerAddr"}],"name":"setSoccerManager","outputs":[],"payable":false,"type":"function"},{"outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"bodyImageUrl","type":"string"},{"name":"aiProcedureId","type":"uint256"},{"name":"status","type":"uint8"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"robots"},{"inputs":[{"name":"_robotId","type":"uint256"}],"name":"canBeRented","outputs":[{"name":"bRenting","type":"bool"}],"payable":false,"type":"function","constant":true},{"name":"setRentalPricePerDay","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_pricePerDay","type":"uint256"}]},{"name":"setRentalPricePerHour","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_pricePerHour","type":"uint256"}]},{"inputs":[{"name":"contractAddr","type":"address"}],"name":"setAIDeveloperContract","outputs":[],"payable":false,"type":"function","constant":false},{"type":"function","constant":true,"inputs":[{"type":"uint256","name":"_robotId"}],"name":"rentalBalanceRemaining","outputs":[{"name":"balance","type":"uint256"}],"payable":false},{"name":"isRobotSealed","outputs":[{"name":"isSealed","type":"bool"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_robotId","type":"uint256"}]},{"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"rentInfos","outputs":[{"name":"id","type":"uint256"},{"name":"robotId","type":"uint256"},{"name":"robotOwner","type":"address"},{"type":"address","name":"renter"},{"name":"minRentalTime","type":"uint256"},{"name":"maxRentalTime","type":"uint256"},{"name":"rentalDate","type":"uint256"},{"name":"returnDate","type":"uint256"},{"name":"rentalPrice","type":"uint256"},{"name":"lastWithdrawDate","type":"uint256"}]},{"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"robotIndexToRenter","outputs":[{"type":"uint256","name":""}],"payable":false},{"type":"function","constant":false,"inputs":[{"type":"address","name":"newOwner"}],"name":"transferOwnership","outputs":[],"payable":false},{"outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ownershipRobots"},{"name":"robotIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}]},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"robotId","type":"uint256"},{"type":"uint256","indexed":true,"name":"aiProcedureId"},{"name":"bodyImageUrl","type":"string","indexed":false}],"name":"Birth","type":"event"},{"name":"Rent","type":"event","anonymous":false,"inputs":[{"indexed":true,"name":"robotId","type":"uint256"},{"name":"_renter","type":"address","indexed":true},{"indexed":false,"name":"_rentalDate","type":"uint256"},{"indexed":false,"name":"_returnDate","type":"uint256"},{"indexed":false,"name":"_rentalPrice","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":true,"name":"robotId","type":"uint256"},{"indexed":true,"name":"_renter","type":"address"},{"indexed":false,"name":"_returnDate","type":"uint256"}],"name":"ReturnRental","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"robotId","type":"uint256"},{"name":"oldRenter","type":"address","indexed":true},{"indexed":true,"name":"newRenter","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name":"Sublet","type":"event"}]';
export const SoccerManagerABI = '[{"type":"function","constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_logoUrl","type":"string"}],"name":"createTeam","outputs":[],"payable":false},{"name":"getTeamOwner","outputs":[{"name":"owner","type":"address"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_teamId","type":"uint256"}]},{"inputs":[{"name":"","type":"uint256"}],"name":"robotToTeamMap","outputs":[{"type":"uint256","name":""}],"payable":false,"type":"function","constant":true},{"name":"isSealedNow","outputs":[{"name":"isSealed","type":"bool"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_teamId","type":"uint256"}]},{"payable":false,"type":"function","constant":true,"inputs":[],"name":"getTeamNum","outputs":[{"name":"teamNum","type":"uint256"}]},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"removeTeam"},{"type":"function","constant":true,"inputs":[{"type":"uint256","name":""}],"name":"robotTeams","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"logoUrl","type":"string"},{"type":"address","name":"owner"},{"name":"removed","type":"bool"}],"payable":false},{"payable":false,"type":"function","constant":true,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"getTeamCompetitionDates","outputs":[{"name":"competitionDates","type":"uint256[]"}]},{"outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"managerToRobotTeam"},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionAddr","type":"address"}],"name":"setCompetition"},{"name":"removeRobotFromTeam","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_teamId","type":"uint256"}]},{"type":"function","constant":false,"inputs":[{"type":"address","name":"robotMgrAddr"}],"name":"setRobotMgr","outputs":[],"payable":false},{"name":"getTeamCount","outputs":[{"name":"teamNum","type":"uint256"}],"payable":false,"type":"function","constant":true,"inputs":[]},{"inputs":[{"name":"_teamId","type":"uint256"}],"name":"recoverTeam","outputs":[],"payable":false,"type":"function","constant":false},{"outputs":[{"type":"bool","name":"exist"},{"name":"robotTeamId","type":"uint256"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"isRobotAddedToTeam"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"type":"uint256","name":"_teamId"}],"name":"addRobotToTeam","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"name":"isTeamBelongToOwner","outputs":[{"name":"beBelong","type":"bool"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_teamId","type":"uint256"},{"name":"owner","type":"address"}]},{"inputs":[{"name":"manager","type":"address"}],"name":"getManagerTeams","outputs":[{"name":"teamIds","type":"uint256[]"}],"payable":false,"type":"function","constant":true},{"constant":false,"inputs":[{"name":"_teamId","type":"uint256"},{"name":"date","type":"uint256"}],"name":"addCompetitionDate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"type":"uint256","name":"_teamId"}],"name":"getTeamRobots","outputs":[{"name":"robotIds","type":"uint256[]"}],"payable":false,"type":"function"},{"name":"NewTeamCreated","type":"event","anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"type":"uint256","indexed":false,"name":"teamIdID"},{"type":"string","indexed":false,"name":"name"}]}]';
export const EmulatePlatformABI = '[{"name":"getEpIds","outputs":[{"name":"epIds","type":"uint256[]"}],"payable":false,"type":"function","constant":true,"inputs":[]},{"type":"function","constant":true,"inputs":[{"name":"_epId","type":"uint256"}],"name":"isPassed","outputs":[{"name":"bPassed","type":"bool"}],"payable":false},{"constant":false,"inputs":[{"name":"_epId","type":"uint256"},{"name":"_passed","type":"bool"}],"name":"setPassed","outputs":[],"payable":false,"type":"function"},{"type":"function","constant":true,"inputs":[],"name":"getEPNum","outputs":[{"name":"epNum","type":"uint256"}],"payable":false},{"payable":false,"type":"function","constant":false,"inputs":[{"name":"_cpu","type":"uint256"},{"name":"_coreNum","type":"uint256"},{"name":"_memorySize","type":"uint256"},{"name":"_bandwidth","type":"uint256"},{"name":"_provider","type":"string"},{"name":"_email","type":"string"}],"name":"addPlatform","outputs":[]},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"type":"function"},{"name":"isValidOwner","outputs":[{"type":"bool","name":"bValid"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_epId","type":"uint256"}]},{"constant":false,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"type":"function","constant":false,"inputs":[],"name":"isOwner","outputs":[{"type":"bool","name":""}],"payable":false},{"type":"function","constant":true,"inputs":[{"name":"","type":"address"},{"type":"uint256","name":""}],"name":"ownerEPMap","outputs":[{"name":"","type":"uint256"}],"payable":false},{"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"epList","outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"cpu","type":"uint256"},{"name":"coreNum","type":"uint256"},{"type":"uint256","name":"memorySize"},{"name":"bandwidth","type":"uint256"},{"name":"provider","type":"string"},{"name":"email","type":"string"},{"name":"passed","type":"bool"},{"name":"successNum","type":"uint256"}],"payable":false},{"constant":false,"inputs":[{"type":"address","name":"newOwner"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]';
export const CompetitionABI = '[{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"competitionIds","type":"uint256[]"}],"name":"checkRunningCompetition"},{"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"teamCompetitions","outputs":[{"name":"","type":"uint256"}],"payable":false},{"constant":false,"inputs":[{"type":"uint256","name":"_competitionId"}],"name":"acceptCompetition","outputs":[],"payable":true,"type":"function"},{"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"}],"name":"refundAfterReject","outputs":[],"payable":false},{"constant":true,"inputs":[{"name":"status","type":"uint8"}],"name":"getCompetitionsByStat","outputs":[{"name":"competitionIdArr","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_teamId","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_allTypes","type":"bool"},{"name":"_status","type":"uint8"}],"name":"queryTeamCompetition","outputs":[{"name":"competitionIdArr","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"type":"uint256","name":"_competitionId"}],"name":"addAppearanceFee","outputs":[],"payable":true,"type":"function"},{"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"},{"name":"_liveUrl","type":"string"}],"name":"setLiveUrl","outputs":[]},{"name":"epAddFullLog","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"},{"name":"_logUrl","type":"string"},{"name":"_logHash","type":"bytes32"}]},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_epPunishChargeRatio","type":"uint256"}],"name":"setEpPunishChargeRatio"},{"constant":false,"inputs":[{"name":"_epId","type":"uint256"},{"type":"uint256","name":"_competitionId"}],"name":"addCheatCompetitionOfEp","outputs":[],"payable":false,"type":"function"},{"outputs":[{"type":"uint256","name":""}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"epSuccessCompetitionsNum"},{"type":"function","constant":true,"inputs":[{"name":"","type":"uint256"},{"type":"uint256","name":""}],"name":"epCompetitions","outputs":[{"name":"","type":"uint256"}],"payable":false},{"name":"renounceOwnership","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[]},{"constant":true,"inputs":[{"type":"uint256","name":"_competitionId"}],"name":"getLiveUrls","outputs":[{"name":"liveUrl","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"queryTeamAllCompetitions","outputs":[{"type":"uint256[]","name":"competitionIdArr"}],"payable":false,"type":"function"},{"type":"function","constant":true,"inputs":[{"name":"_epId","type":"uint256"}],"name":"getCheatCompetitionsOfEp","outputs":[{"name":"competitionIdArr","type":"uint256[]"}],"payable":false},{"inputs":[{"name":"_competitionId","type":"uint256"}],"name":"executeSettlement","outputs":[],"payable":false,"type":"function","constant":false},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"epCheatCompetitions","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"type":"function","constant":false,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false},{"outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","constant":false,"inputs":[],"name":"isOwner"},{"inputs":[{"type":"uint256","name":""}],"name":"competitionInfos","outputs":[{"name":"id","type":"uint256"},{"name":"initiator","type":"address"},{"name":"opponent","type":"address"},{"name":"startTime","type":"uint256"},{"name":"teamOneId","type":"uint256"},{"type":"uint256","name":"teamTwoId"},{"name":"wager","type":"uint256"},{"name":"appearanceFee","type":"uint256"},{"name":"teamTwoAccept","type":"bool"},{"name":"status","type":"uint8"},{"name":"teamOneScore","type":"uint256"},{"name":"teamTwoScore","type":"uint256"},{"name":"epId","type":"uint256"},{"name":"hasSettlement","type":"bool"}],"payable":false,"type":"function","constant":true},{"outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"soccerManagerAddr","type":"address"}],"name":"setSoccerManager"},{"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"}],"name":"modifyWager","outputs":[],"payable":true},{"constant":false,"inputs":[{"name":"emulatePlatformAddr","type":"address"}],"name":"setEmulatePlatform","outputs":[],"payable":false,"type":"function"},{"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"},{"name":"competitionStat","type":"uint8"}],"name":"epSetCompetitionResult","outputs":[],"payable":false},{"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"}],"name":"rejectCompetition","outputs":[]},{"name":"epStartCompetition","outputs":[],"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"}]},{"constant":false,"inputs":[{"name":"_epId","type":"uint256"},{"name":"_competitionId","type":"uint256"}],"name":"bindEmulatePlatform","outputs":[],"payable":true,"type":"function"},{"inputs":[{"name":"_commissionRatio","type":"uint256"}],"name":"setCommissionRatio","outputs":[],"payable":false,"type":"function","constant":false},{"constant":false,"inputs":[{"name":"_myTeamId","type":"uint256"},{"name":"_opponentTeamId","type":"uint256"},{"name":"_startTime","type":"uint256"}],"name":"launchCompetition","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"competitionLogs","outputs":[{"type":"uint256","name":"competitionId"},{"name":"logUrl","type":"string"},{"name":"logHash","type":"bytes32"},{"name":"liveUrl","type":"string"},{"name":"epAwardChargeRatio","type":"uint256"},{"name":"epPunishChargeRatio","type":"uint256"},{"name":"commissionRatio","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"competitionIds","type":"uint256[]"}],"name":"checkWaitForStartCompetition","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"managerCompetitions","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"payable":false,"type":"function","constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_startTime","type":"uint256"}],"name":"getUnConfirmCompetition","outputs":[{"name":"competitionId","type":"int256"}]},{"outputs":[{"type":"uint256[]","name":"competitionIdArr"}],"payable":false,"type":"function","constant":true,"inputs":[{"name":"_epId","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_allTypes","type":"bool"},{"type":"uint8","name":"_status"}],"name":"queryEpCompetition"},{"payable":false,"type":"function","constant":false,"inputs":[{"name":"_competitionId","type":"uint256"},{"name":"teamOneScore","type":"bool"},{"name":"moment","type":"uint256"}],"name":"epAddScore","outputs":[]},{"inputs":[{"name":"_competitionId","type":"uint256"}],"name":"cancelCompetition","outputs":[],"payable":false,"type":"function","constant":false},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_startTime","type":"uint256"}],"name":"getConfirmCompetition","outputs":[{"name":"competitionId","type":"int256"}],"payable":false,"type":"function"},{"payable":false,"type":"function","constant":true,"inputs":[],"name":"getCompetitionNum","outputs":[{"name":"competitionNum","type":"uint256"}]},{"type":"function","constant":false,"inputs":[{"name":"_epAwardChargeRatio","type":"uint256"}],"name":"setEpAwardChargeRatio","outputs":[],"payable":false},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"initiator","type":"address"},{"indexed":false,"name":"opponent","type":"address"},{"type":"uint256","indexed":true,"name":"teamOneId"},{"indexed":true,"name":"teamTwoId","type":"uint256"},{"indexed":false,"name":"startTime","type":"uint256"}],"name":"LaunchCompetition","type":"event"},{"type":"event","anonymous":false,"inputs":[{"indexed":false,"name":"opponent","type":"address"},{"type":"address","indexed":false,"name":"initiator"},{"indexed":true,"name":"competitionId","type":"uint256"}],"name":"AcceptCompetition"},{"inputs":[{"indexed":false,"name":"opponent","type":"address"},{"indexed":false,"name":"initiator","type":"address"},{"indexed":true,"name":"competitionId","type":"uint256"}],"name":"RejectCompetition","type":"event","anonymous":false},{"anonymous":false,"inputs":[{"type":"address","indexed":false,"name":"initiator"},{"indexed":false,"name":"opponent","type":"address"},{"indexed":true,"name":"competitionId","type":"uint256"}],"name":"CancelCompetition","type":"event"}]';

export const AIDeveloperAddress = '0x8464e61d410d79128acfbdb7d679b1c49b939527';
export const RobotMgrAddress = '0xcd31bcb22f881ab5f32bfeccf79000bbea8c2f3d';
export const SoccerManagerAddress = '0x61a9225c90aec5889a2513d884b87f3bf2981ed7';
export const EmulatePlatformAddress = '0x1c6df2247540cdaa0286e2bf765b078dbac3a657';
export const CompetitionAddress = '0x65df7833d2fbdf0fcbc7911d66e7f3f1970e88ac';

export const DefaultAddress = '0x55909bca45fe58eba9723ac2b727bc6a48ae9f47';
export const DefaultPrivateKey = '0x8431c7a9483fdfc3c90f145cbcb8af983115f1819c33e28225b73ce551bc5841';

export const CompetitionStatus = { WaitForAccept:0, Canceled:1, Reject:2, WaitForEmulatePlatform:3, WaitForStart:4,
                        Running:5, TeamOneWin:6, TeamTwoWin:7, Tied:8, Exception:9 }