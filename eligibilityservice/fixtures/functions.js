(function(){
    this.isEligible = function(account_id) {
        try {
            if (account_id in this.Accounts) {
                return this.Accounts[account_id].status ? 'CUSTOMER_ELIGIBLE' : 'CUSTOMER_INELIGIBLE';
            }

            return 'Invalid account number exception';
        } catch (err) {
            return 'Technical failure exception';
        }

        return false;
    };
}.bind(App.EligibilityService.Data))();
