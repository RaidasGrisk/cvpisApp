from data_utils.cvpis_sutartys_hook import cvpis_sutartys_update
from data_utils.cvpis_tender_hook import cvpis_tender_update

if __name__ == '__main__':
    cvpis_tender_update(days_to_look_back=1)
    # cvpis_sutartys_update(days_to_look_back=365)