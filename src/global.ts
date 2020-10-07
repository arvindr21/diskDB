export const MESSAGES = {
  ERROR: {
    COLL_MT: 'Collection cannot be empty',
    COLL_NF: 'No Collection found with name: ',
    GEN: 'Something went wrong! ',
    LOAD_FL: 'Load Collection Failed: ',
    SYN_ERR : 'SyntaxError',
    PARSING_ERROR : 'Error occured during Parsing, Please be noted that Data once compressed cannot be read if compress is set to false or vice versa'
  },
  INFO: {
    COLL_LD_DONE: 'Successfully loaded all collections ',
    PRCG: 'Processing collection ',
  },
  WARN: {
    ENC_WRN:
      'Data once set to encrypt cannot be decrypted if later on `encrypt` is set to false',
    COMP_WRN:
      'Data once compressed cannot be read if compress is set to false or vice versa',
  },
};

export const EXT_JSON = '.json';
export const EXT_DB = '.db';
export const EMPTY_ARRAY = '[]';
export const EMPTY_OBJECT = '{}';
